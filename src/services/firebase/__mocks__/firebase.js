const mockResponse = {
  credential: {
    accessToken: 'AccessToken',
  },
  user: {
    email: 'dev@devlink.com',
    photoURL: 'https://some-new-url-here',
  },
};

const config = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  databaseURL: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

const githubOAuthLogin = () => new Promise((resolve) => resolve(mockResponse));

const githubOAuthLogout = jest.fn();

const firebase = {
  auth: () => ({
    GithubAuthProvider: new Promise((resolve) => resolve()),
    signInWithPopup: () => new Promise((resolve) => resolve(mockResponse)),
    signOut: () => new Promise((resolve) => resolve()),
  }),
};

export {
  firebase, config, githubOAuthLogin, githubOAuthLogout,
};
