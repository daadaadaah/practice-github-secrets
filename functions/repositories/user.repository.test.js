const userRepository =  require('./user.repository');

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn().mockImplementation(() => jest.fn()),
  firestore: jest.fn().mockImplementation(() => ({  
    collection: jest.fn().mockImplementation(() => {
      return {
        doc: jest.fn().mockImplementation(() => {
          return {
            get: jest.fn().mockResolvedValue({ 
              uid: '1234',
              email: 'devlink@gmail.com',
              photoURL: 'http://123.com',
            }),
            set: jest.fn().mockResolvedValue(null),
          };
        })
      };
    })
  })),
  credential: {
    cert: jest.fn().mockImplementation(() => jest.fn()),
  },
}));

describe('user.repository', () => {
  const user = { 
    uid: '1234',
    email: 'devlink@gmail.com',
    photoURL: 'http://123.com',
  };

  describe('findByUid', () => {
    it('returns user', async () => {
      const foundUser = await userRepository.findByUid(user.uid);
      expect(foundUser.email).toBe(user.email);
    });
  });

  describe('create', () => {
    it('inserts user to user collection', async () => {
      const result = await userRepository.create(user);
      expect(result).not.toBeUndefined();
    });
  });
});
