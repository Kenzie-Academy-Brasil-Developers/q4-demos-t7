import { verify } from 'jsonwebtoken';
import supertest from 'supertest';
import { ConnectionTestJest, generateUser } from '..';
import app from '../../app';
import jwtConfig from '../../jwtConfig';
import { UserRepository } from '../../repositories';

describe('get user token route integration test', () => {
  beforeAll(async () => {
    await new ConnectionTestJest().create();
  });

  afterAll(async () => {
    await new ConnectionTestJest().clear();
    await new ConnectionTestJest().close();
  });

  beforeEach(async () => {
    await new ConnectionTestJest().clear();
  });

  it('will return status 200 and user token as json response', async () => {
    const { email, password } = await new UserRepository().save(generateUser());
    const response = await supertest(app)
      .post('/api/login')
      .send({ email, password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');

    expect(verify(response.body.token, jwtConfig.secretKey)).toBeTruthy();
    expect(verify(response.body.token, jwtConfig.secretKey)).toEqual(
      expect.objectContaining({ email })
    );
  });

  it('will return status 404 and invalid credentials as json response if user does not exists', async () => {
    const { email, password } = generateUser();
    const response = await supertest(app)
      .post('/api/login')
      .send({ email, password });

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ message: 'invalid credentials' });
  });

  it('will return status 404 and invalid credentials as json response if wrong password', async () => {
    const { email } = await new UserRepository().save(generateUser());
    const { password } = generateUser();
    const response = await supertest(app)
      .post('/api/login')
      .send({ email, password });

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ message: 'invalid credentials' });
  });
});
