import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { v4 } from 'uuid';
import { USERS } from '../../configs';
import { getUser } from '../../middlewares';
import { generateUser } from '../dataToUseInTests';

describe('getUser Middlewares Tests', () => {
  const mockReq = {};
  const mockRes = {};
  const nextFn = jest.fn();

  beforeEach(() => {
    mockRes.json = jest.fn().mockReturnValue(mockRes);
    mockRes.status = jest.fn().mockReturnValue(mockRes);
  });

  it('Status = 404 | Json = user not found', () => {
    mockReq.params = {
      uuid: v4(),
    };

    getUser(mockReq, mockRes, nextFn);

    const expectedStatusCode = 404;
    expect(mockRes.status).toBeCalledWith(expectedStatusCode);

    const expectedJsonMessage = { message: 'user not found!' };
    expect(mockRes.json).toBeCalledWith(expectedJsonMessage);
  });

  it('User found', () => {
    const user = generateUser();
    USERS.push(user);

    mockReq.params = {
      uuid: user.uuid,
    };

    getUser(mockReq, mockRes, nextFn);

    expect(nextFn).toBeCalledTimes(1);
    expect(mockReq.user).toBe(user);
  });
});
