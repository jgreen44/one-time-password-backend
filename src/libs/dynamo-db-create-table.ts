import { CreateTableCommand } from '@aws-sdk/client-dynamodb';
import { ddbClient } from './dynamo-db-client';
import { httpResponse } from './returnHelper';
import { IhttpResponse, TABLE_NAME } from '../util/types';

// Set the parameters
export const params = {
  AttributeDefinitions: [
    {
      AttributeName: 'email',
      AttributeType: 'S',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'email',
      KeyType: 'HASH',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: TABLE_NAME,
  StreamSpecification: {
    StreamEnabled: false,
  },
};

export const createDynamoDBTable = async (): Promise<IhttpResponse> => {
  try {
    await ddbClient.send(new CreateTableCommand(params));
    return httpResponse('table created in database', 200);
  } catch (err) {
    return httpResponse(err as string, 400);
  }
};
