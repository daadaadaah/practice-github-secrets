import reducer, {
  setAccessToken, setUserInfo, resetAccessToken, resetUserInfo,
} from './slice';

jest.mock('../services/firebase/firebase.js');

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      accessToken: '',
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
        accessToken: '',
        userInfo: null,

      };

      const state = reducer(initialState, setAccessToken('ACCESS_TOKEN'));

      expect(state.accessToken).toEqual('ACCESS_TOKEN');
    });
  });

  describe('setUserInfo', () => {
    it('set userInfo', () => {
      const initialState = {
        accessToken: '',
        userInfo: null,
      };

      const userInfo = {
        id: 'email',
        img: 'photoURL',
      };

      const state = reducer(initialState, setUserInfo(userInfo));

      expect(state.userInfo).toEqual(userInfo);
    });
  });

  describe('resetAccessToken', () => {
    it('reset accessToken', () => {
      const initialState = {
        accessToken: 'ACCESS_TOKEN',
        userInfo: {
          id: 'email',
          img: 'photoURL',
        },

      };

      const state = reducer(initialState, resetAccessToken());

      expect(state.accessToken).toEqual('');
    });
  });

  describe('resetUserInfo', () => {
    it('reset userInfo', () => {
      const initialState = {
        accessToken: 'ACCESS_TOKEN',
        userInfo: {
          id: 'email',
          img: 'photoURL',
        },
      };

      const state = reducer(initialState, resetUserInfo());

      expect(state.userInfo).toEqual(null);
    });
  });
});
