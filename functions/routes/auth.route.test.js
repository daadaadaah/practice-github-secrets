import request from 'supertest';

import app from '../app';

import auth from '../services/auth.service';

jest.mock('../services/auth.service');

describe('/auth', () => {
  const user = {
    uid: '1234',
    email: 'devlink@gmail.com',
    photoURL: 'http://123.com',
  };

  describe('POST /login', () => {
    context('with existed user', () => {
      beforeEach(() => {
        auth.login.mockImplementation(() => ({
          exists: jest.fn().mockResolvedValue(user),
        }));
      });

      it('returns status code of 201 and true', async () => {
        const response = await request(app).post('/auth/login').send({
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
        });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
          message: 'login successfully',
          body: {
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
          },
        });
      });
    });

    context('without existed user && signup successfully', () => {
      const newUser = {
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
      };

      beforeEach(() => {
        auth.login.mockImplementation(() => ({
          exists: null,
        }));
      });

      it('returns status code of 201 and true', async () => {
        const response = await request(app).post('/auth/login').send({
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
        });

        // console.log("response : ", response);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
          message: 'signup successfully',
          body: {
            uid: newUser.uid,
            email: newUser.email,
            photoURL: newUser.photoURL,
          },
        });
      });
    });

    context('without existed user && signup is failed', () => {
      beforeEach(() => {
        auth.login.mockImplementation(() => ({
          exists: null,
        }));

        auth.signup.mockRejectedValue('error');
      });

      const newUser = {
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
      };

      it('returns status code of 500', async () => {
        const response = await request(app).post('/auth/login').send({
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
        });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({});
      });
    });
  });
});
