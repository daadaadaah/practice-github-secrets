const auth = require('./auth.service');

const userRepository = require('../repositories/user.repository');

jest.mock('../repositories/user.repository');

describe('auth', () => {
  const user = { 
    uid: '1234',
    email: 'devlink@gmail.com',
    photoURL: 'http://123.com',
  };

  beforeEach(() => {
    userRepository.create.mockClear();
  });

  describe('login', () => {
    context('with given existing id and right password', () => {
      beforeEach(async () => {
        userRepository.findByUid.mockResolvedValue(user);

      });

      it('returns a userInfo ', async () => {
        const userInfo = await auth.login(user.uid);

        expect(userInfo).toBe(user);
      });
    });
  });

  describe('signup', () => {
    context('with valid user', () => {
      beforeEach(() => {
        userRepository.findByUid.mockResolvedValue(undefined);
      });

      it('creates user', async () => {
        const errors = await auth.signup(user);
        expect(userRepository.create).toBeCalledWith(user);
        expect(errors).toBeFalsy();
      });
    });
  });
});
