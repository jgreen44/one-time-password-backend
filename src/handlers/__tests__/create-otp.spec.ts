import logger from '../../util/logger';
import { handler } from '../create-otp';
import { IhttpResponse, _headers } from '../../util/types';

let spy: jest.SpyInstance;

beforeAll(() => {
  spy = jest.spyOn(logger, 'info').mockImplementation();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('hello handler', () => {
  const eventObj: IhttpResponse = {
    statusCode: 200,
    body: JSON.stringify({
      email: 'test@test.com',
      otp: '123',
    }),
    headers: _headers,
  };

  it('should say hello', async () => {
    const result = await handler(eventObj);
    expect(result).toMatchSnapshot();
  });
  it('should log to winston when called', async () => {
    await handler(eventObj);
    expect(spy).toMatchSnapshot();
  });
});
