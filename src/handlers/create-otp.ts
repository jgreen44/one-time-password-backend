import { PutItemCommand, GetItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { ddbClient } from '../libs/dynamo-db-client';

import { httpResponse } from '../libs/returnHelper';

import { IhttpResponse, TABLE_NAME } from '../util/types';
import { createDynamoDBTable } from '../libs/dynamo-db-create-table';
import { runSendOTPEmail } from '../util/send-email';

export const handler = async (event: IhttpResponse): Promise<IhttpResponse> => {
  const eventBody = JSON.parse(event.body);

  const timestamp = new Date().getTime().toString();

  const putItemParams = {
    TableName: TABLE_NAME,
    Item: {
      email: { S: eventBody.email },
      otp: { S: eventBody.otp },
      created_at: { S: timestamp },
      updated_at: { S: timestamp },
    },
  };

  const getItemParams = {
    TableName: TABLE_NAME,
    Key: {
      email: { S: eventBody.email },
    },
  };

  const updateItemParams = {
    TableName: TABLE_NAME,
    Key: {
      email: { S: eventBody.email },
    },
    UpdateExpression: 'set otp = :otp',
    ExpressionAttributeValues: {
      ':otp': { S: eventBody.otp },
    },
  };

  // create DynamoDB table.
  try {
    await createDynamoDBTable();
  } catch (err) {
    return httpResponse(`error creating dynamoDB ${err}`, 400);
  }

  // check if email already exists in db
  const item = await ddbClient.send(new GetItemCommand(getItemParams));

  // if no item exists, put it into the db
  if (!item.Item) {
    // insert items into database
    try {
      await ddbClient.send(new PutItemCommand(putItemParams));
    } catch (err) {
      return httpResponse(`item not inserted into database ${err}`, 400);
    }
    // if item does exist, update the OTP
  } else {
    try {
      await ddbClient.send(new UpdateItemCommand(updateItemParams));
    } catch (err) {
      return httpResponse(`item not updated in database ${err}`, 400);
    }
  }

  // send email
  try {
    await runSendOTPEmail(eventBody.email, eventBody.otp);
  } catch (err) {
    return httpResponse(`Email not sent ${err}`, 400);
  }

  return httpResponse(`Your email has been sent`, 200);
};
