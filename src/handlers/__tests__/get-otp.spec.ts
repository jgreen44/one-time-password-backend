import { handler } from '../get-otp';
import { _headers, IhttpResponse } from '../../util/types';

describe('goodbye handler', () => {
  const eventObj: IhttpResponse = {
    statusCode: 200,
    body: JSON.stringify({
      email: 'test@test.com',
    }),
    headers: _headers,
  };
  test('it should say goodbye', async () => {
    const result = await handler(eventObj);
    expect(result).toMatchSnapshot();
  });
});
