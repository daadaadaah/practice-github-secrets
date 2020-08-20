import { createSlice } from '@reduxjs/toolkit';

import { githubOAuthLogin, githubOAuthLogout } from '../services/firebase/firebase';

import { saveItem, removeItem } from '../services/storage/localStorage';

const { actions, reducer } = createSlice({
  name: 'Github-secrets',
  initialState: {
    accessToken: '',
    userInfo: null,
  },
  reducers: {
    setAccessToken(state, { payload: accessToken }) {
      return {
        ...state,
        accessToken,
      };
    },
    setUserInfo(state, { payload: userInfo }) {
      return {
        ...state,
        userInfo,
      };
    },
    resetAccessToken(state) {
      return {
        ...state,
        accessToken: '',
      };
    },
    resetUserInfo(state) {
      return {
        ...state,
        userInfo: null,
      };
    },
  },
});

export const {
  setAccessToken,
  setUserInfo,
  resetAccessToken,
  resetUserInfo,
} = actions;

export function login() {
  return async (dispatch) => {
    const response = await githubOAuthLogin();

    const { accessToken } = response.credential;

    saveItem('accessToken', accessToken);

    const { email, photoURL, uid } = response.user;

    const userInfo = {
      uid,
      email,
      photoURL,
    };

    dispatch(setAccessToken(accessToken));
    dispatch(setUserInfo(userInfo));
  };
}

export const logout = () => async (dispatch) => {
  removeItem('accessToken');

  await githubOAuthLogout();
  dispatch(resetAccessToken());
  dispatch(resetUserInfo());
};

export default reducer;
