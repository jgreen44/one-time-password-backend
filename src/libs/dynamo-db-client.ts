import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const REGION = 'us-east-1';
export const ddbClient = new DynamoDBClient({
  region: REGION,
});
