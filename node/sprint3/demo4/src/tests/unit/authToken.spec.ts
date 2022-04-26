import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { generateUser } from '..';
import jwtConfig from '../../jwtConfig';
import { authToken } from '../../middlewares';

describe('unit test for authToken middleware', () => {
  const mockReq: Partial<Request> = {};
  const mockRes: Partial<Response> = {};
  const mockNext: Partial<NextFunction> = jest.fn();

  beforeEach(() => {
    mockRes.json = jest.fn().mockReturnValue(mockRes);
    mockRes.status = jest.fn().mockReturnValue(mockRes);
  });

  it('test if mockNext was called and req has token key', () => {
    mockReq.userDb = generateUser();

    authToken(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockNext).toBeCalled();
    expect(mockNext).toBeCalledTimes(1);
    expect(mockReq).toHaveProperty('token');
    expect(verify(mockReq.token, jwtConfig.secretKey)).toBeTruthy();
  });
});
