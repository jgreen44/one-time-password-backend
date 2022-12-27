export type IhttpResponse = {
  statusCode: number;
  body: string;
  headers: { [name: string]: string };
};

export type EventBodyType = {
  email: string;
  otp: string;
};

export const TABLE_NAME = 'ONE_TIME_PASSWORD';
export const FROM_EMAIL = 'us291888@gmail.com';
export const RETURN_PATH_ARN = 'arn:aws:ses:us-east-2:616233307424:identity/us291888@gmail.com';

export const SOURCE_ARN = 'arn:aws:ses:us-east-2:616233307424:identity/us291888@gmail.com';
export const _headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};
