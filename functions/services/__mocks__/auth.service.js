const auth = {
  login: jest.fn().mockImplementation(() => ({
    exists: jest.fn(),
  })),
  signup: jest.fn(),
};

export default auth;