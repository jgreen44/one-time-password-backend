import { SESClient } from '@aws-sdk/client-ses';
// Set the AWS Region.
const REGION = 'us-east-2';
// Create SES service object.
const sesClient = new SESClient({ region: REGION });
export { sesClient };
