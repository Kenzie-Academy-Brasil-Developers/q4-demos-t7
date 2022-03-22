import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../../app';
import { USERS } from '../../configs';
import { generateUser, baseURL } from '../dataToUseInTests';

describe('Route signup Tests', () => {
  const user = generateUser();

  test('201 Created: return user and push user to USERS DB', async () => {
    const response = await request(app).post(`${baseURL}/signup`).send(user);

    const expectedStatusCode = 201;
    expect(response.statusCode).toBe(expectedStatusCode);

    const resBodyKeys = Object.keys(response.body).sort();
    const expectedBodyKeys = Object.keys(user).sort();
    expect(resBodyKeys).toStrictEqual(expectedBodyKeys);

    expect(USERS.find((_) => _.email === user.email)).toBeTruthy();
  });

  test('409 Conflict: email already exists', async () => {
    const response = await request(app).post(`${baseURL}/signup`).send(user);

    const expectedStatusCode = 409;
    expect(response.statusCode).toBe(expectedStatusCode);

    const expectResponseBody = { error: 'email already exists' };
    expect(response.body).toStrictEqual(expectResponseBody);

    expect(USERS.filter((_) => _.email === user.email)).toHaveLength(1);
  });

  test('400 Bad Request: error, email is a required field', async () => {
    const { email, ...sendUser } = user;
    const dbLengthBeforeRequest = USERS.length;
    const response = await request(app)
      .post(`${baseURL}/signup`)
      .send(sendUser);

    const expectedStatusCode = 400;
    expect(response.statusCode).toBe(expectedStatusCode);

    const expectResponseBody = { error: ['email is a required field'] };
    expect(response.body).toStrictEqual(expectResponseBody);

    expect(dbLengthBeforeRequest).toEqual(USERS.length);
  });
});
