import faker from '@faker-js/faker';
import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { generateUser } from '..';
import jwtConfig from '../../jwtConfig';
import { validateToken } from '../../middlewares';

describe('unit test for validateToken middleware', () => {
  const mockReq: Partial<Request> = {};
  const mockRes: Partial<Response> = {};
  const mockNext: Partial<NextFunction> = jest.fn();

  beforeEach(() => {
    mockRes.json = jest.fn().mockReturnValue(mockRes);
    mockRes.status = jest.fn().mockReturnValue(mockRes);
  });

  it('will return error message if missing token. Status 401 | missing authorization header', () => {
    mockReq.headers = {
      authorization: undefined,
    };

    validateToken(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockRes.status).toBeCalled();
    expect(mockRes.status).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(401);

    expect(mockRes.json).toBeCalled();
    expect(mockRes.json).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith({
      message: 'missing authorization header',
    });
  });

  it('will return error message if malformed token. Status 401 | jwt malformed', () => {
    mockReq.headers = {
      authorization: 'Bearer qwopewqioej1!jewqoijewqi',
    };

    validateToken(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockRes.status).toBeCalled();
    expect(mockRes.status).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(401);

    expect(mockRes.json).toBeCalled();
    expect(mockRes.json).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith({
      message: { name: 'JsonWebTokenError', message: 'jwt malformed' },
    });
  });

  it('will return error message if invalid token. Status 401 | invalid signature', () => {
    const invalidToken = sign({ ...generateUser() }, faker.datatype.string(10));

    mockReq.headers = {
      authorization: `Bearer ${invalidToken}`,
    };

    validateToken(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockRes.status).toBeCalled();
    expect(mockRes.status).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(401);

    expect(mockRes.json).toBeCalled();
    expect(mockRes.json).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith({
      message: { name: 'JsonWebTokenError', message: 'invalid signature' },
    });
  });

  it('will call next function and add key decoded on mockReq object', () => {
    const { secretKey, expiresIn } = jwtConfig;
    const user = generateUser();
    const validToken = sign({ ...user }, secretKey, { expiresIn });

    mockReq.headers = {
      authorization: `Bearer ${validToken}`,
    };

    validateToken(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockNext).toBeCalled();
    expect(mockNext).toBeCalledTimes(1);

    expect(mockReq).toHaveProperty('decoded');
    expect(mockReq.decoded).toEqual(expect.objectContaining(user));
  });
});
