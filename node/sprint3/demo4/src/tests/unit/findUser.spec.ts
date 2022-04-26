import { NextFunction, Request, Response } from 'express';
import { ConnectionTestJest, generateUser } from '..';
import User from '../../entities/User';
import { findUser } from '../../middlewares';
import { UserRepo, UserRepository } from '../../repositories';

describe('unit test for findUser middleware', () => {
  const mockReq: Partial<Request> = {};
  const mockRes: Partial<Response> = {};
  const mockNext: Partial<NextFunction> = jest.fn();

  let userRepo: UserRepo;
  let user: User;

  beforeAll(async () => {
    await new ConnectionTestJest().create();
  });

  afterAll(async () => {
    await new ConnectionTestJest().clear();
    await new ConnectionTestJest().close();
  });

  beforeEach(async () => {
    await new ConnectionTestJest().clear();
    mockRes.json = jest.fn().mockReturnValue(mockRes);
    mockRes.status = jest.fn().mockReturnValue(mockRes);

    userRepo = new UserRepository();
    user = generateUser();
  });

  it('will return a error if user does not exist on database. Status 404 | invalid credentials', async () => {
    mockReq.body = {
      email: 'qlqrEmail@email.com',
    };

    await findUser(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockRes.status).toBeCalled();
    expect(mockRes.status).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(404);

    expect(mockRes.json).toBeCalled();
    expect(mockRes.json).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith({ message: 'invalid credentials' });
  });

  it('will return a error if password does not match. Status 404 | invalid credentials', async () => {
    await userRepo.save(user);

    mockReq.body = {
      email: user.email,
      password: 'a',
    };

    await findUser(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockRes.status).toBeCalled();
    expect(mockRes.status).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(404);

    expect(mockRes.json).toBeCalled();
    expect(mockRes.json).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith({ message: 'invalid credentials' });
  });

  it('will call next function and add userDb property', async () => {
    await userRepo.save(user);
    mockReq.body = { ...user };

    await findUser(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockNext).toBeCalled();
    expect(mockNext).toBeCalledTimes(1);

    expect(mockReq).toHaveProperty('userDb');
    expect(mockReq.userDb).toEqual(user);
  });
});
