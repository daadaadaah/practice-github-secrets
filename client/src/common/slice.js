import { createSlice } from '@reduxjs/toolkit';

import {
  githubOAuthLogin,
  githubOAuthLogout,
} from '../services/firebase/firebase';

import { postUserInfo } from '../services/api/api';

import { saveItem, removeItem } from '../services/storage/localStorage';

const { actions, reducer } = createSlice({
  name: 'Github-secrets',
  initialState: {
    accessToken: null,
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
        accessToken: null,
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

    const firebaseUserIdToken = await response.user.getIdToken(true);

    const accessToken = {
      github: response.credential.accessToken,
      firebase: firebaseUserIdToken,
    };

    saveItem('accessToken', {
      github: response.credential.accessToken,
      firebase: firebaseUserIdToken,
    });

    dispatch(setAccessToken(accessToken));

    const { uid, email, photoURL } = response.user;

    const result = await postUserInfo({ uid, email, photoURL }); // TODO : 토큰 관리 방법 논의 후 수정 고려

    const userInfo = {
      uid: result.body.uid, // TODO : 토큰 관리 방법 논의 후 삭제 고려
      email: result.body.email,
      photoURL: result.body.photoURL,
    };

    dispatch(setUserInfo(userInfo));
  };
}

// export function autoLogin(accessToken) { // TODO : 토큰 관리 방법 논의 후 구현 예정
//   return async (dispatch) => {
//     // const result  = await fetchGithubUserInfo(accessToken);
//     // console.log("result : ", result);

//     // const userInfo = {
//     //   uid: 'temp', // TODO : 토큰 관리 방법 논의 후 결정하기
//     //   email: result.bio,
//     //   photoURL: result.avatar_url,
//     // };

//     // const result  = await fetchFirebaseUserInfo(accessToken.firebase);
//     console.log("result : ", result);

//     dispatch(setAccessToken(accessToken));
//     dispatch(setUserInfo(userInfo));

//   };
// }

export const logout = () => async (dispatch) => {
  removeItem('accessToken');

  await githubOAuthLogout();
  dispatch(resetAccessToken());
  dispatch(resetUserInfo());
};

export default reducer;
