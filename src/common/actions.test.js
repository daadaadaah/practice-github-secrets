import { getDefaultMiddleware } from '@reduxjs/toolkit';

import configureStore from 'redux-mock-store';

import {
  login,
  setAccessToken,
  setUserInfo,
} from './slice';

jest.mock('../services/firebase/firebase.js');

const mockStore = configureStore(getDefaultMiddleware());

describe('actions', () => {
  let store;

  describe('login', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    const mockAccessToken = 'AccessToken';

    const mockUserInfo = {
      id: 'dev@devlink.com',
      img: 'https://some-new-url-here',
    };

    it('runs setAccessToken and setUserInfo', async () => {
      await store.dispatch(login());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setAccessToken(mockAccessToken));
      expect(actions[1]).toEqual(setUserInfo(mockUserInfo));
    });
  });
});
