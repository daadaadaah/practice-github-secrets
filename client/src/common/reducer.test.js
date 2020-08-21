import reducer, {
  setAccessToken, setUserInfo, resetAccessToken, resetUserInfo,
} from './slice';

jest.mock('../services/firebase/firebase.js');

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      accessToken: null,
      userInfo: null,
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setAccessToken', () => {
    it('set accessToken', () => {
      const initialState = {
        accessToken: null,
        userInfo: null,
      };

      const state = reducer(initialState, setAccessToken({
        github: 'GITHUB_ACCESS_TOKEN',
        firebase: 'FIREBASE_ACCESS_TOKEN',
      }));

      expect(state.accessToken).toEqual({
        github: 'GITHUB_ACCESS_TOKEN',
        firebase: 'FIREBASE_ACCESS_TOKEN',
      });
    });
  });

  describe('setUserInfo', () => {
    it('set userInfo', () => {
      const initialState = {
        accessToken: null,
        userInfo: null,
      };

      const userInfo = {
        uid: 'uid',
        email: 'email',
        photoURL: 'photoURL',
      };

      const state = reducer(initialState, setUserInfo(userInfo));

      expect(state.userInfo).toEqual(userInfo);
    });
  });

  describe('resetAccessToken', () => {
    it('reset accessToken', () => {
      const initialState = {
        accessToken: {
          github: 'GITHUB_ACCESS_TOKEN',
          firebase: 'FIREBASE_ACCESS_TOKEN',
        },
        userInfo: {
          uid: 'uid',
          email: 'email',
          photoURL: 'photoURL',
        },

      };

      const state = reducer(initialState, resetAccessToken());

      expect(state.accessToken).toEqual(null);
    });
  });

  describe('resetUserInfo', () => {
    it('reset userInfo', () => {
      const initialState = {
        accessToken: {
          github: 'GITHUB_ACCESS_TOKEN',
          firebase: 'FIREBASE_ACCESS_TOKEN',
        },
        userInfo: {
          uid: 'uid',
          email: 'email',
          photoURL: 'photoURL',
        },
      };

      const state = reducer(initialState, resetUserInfo());

      expect(state.userInfo).toEqual(null);
    });
  });
});
