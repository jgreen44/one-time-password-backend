import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import { ddbClient } from '../libs/dynamo-db-client';

import { httpResponse } from '../libs/returnHelper';

import { EventBodyType, IhttpResponse, TABLE_NAME } from '../util/types';

export const handler = async (event: IhttpResponse): Promise<IhttpResponse> => {
  const eventBody = JSON.parse(event.body) as EventBodyType;

  const getItemParams = {
    TableName: TABLE_NAME,
    Key: {
      email: { S: eventBody.email },
    },
  };

  const item = await ddbClient.send(new GetItemCommand(getItemParams));

  if (item.Item.email['S'] === eventBody.email) {
    return httpResponse(item.Item, 200);
  }

  return httpResponse(`item not found`, 400);
};
