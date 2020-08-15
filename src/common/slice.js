import { createSlice } from '@reduxjs/toolkit';

import { githubOAuthLogin } from '../services/firebase/firebase';

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
  },
});

export const {
  setAccessToken,
  setUserInfo,
} = actions;

export function login() {
  return async (dispatch) => {
    const response = await githubOAuthLogin();

    if (response !== undefined) {
      const { accessToken } = response.credential;
      const { email, photoURL } = response.user;

      const userInfo = {
        id: email,
        img: photoURL,
      };

      dispatch(setAccessToken(accessToken));
      dispatch(setUserInfo(userInfo));
    }
  };
}

export default reducer;
