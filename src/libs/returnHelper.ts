import { IhttpResponse, _headers } from '../util/types';

export const httpResponse = (message: Record<string, unknown> | string, status: number): IhttpResponse => {
  const responseBody = {
    message,
  };

  return {
    statusCode: status,
    body: JSON.stringify(responseBody),
    headers: _headers,
  };
};
