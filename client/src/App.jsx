import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { login, logout } from './common/slice';

import { loadItem } from './services/storage/localStorage';

import { get } from './common/utils';

export default function App() {
  const dispatch = useDispatch();

  const localToken = loadItem('accessToken');

  const accessToken = useSelector(get('accessToken'));

  const userInfo = useSelector(get('userInfo'));

  // if (localToken && !userInfo) { // TODO : Token 이 이미 있을 경우, 자동 로그인

  //   dispatch(autoLogin(localToken)); // TODO : 토큰 관리 방법 논의 후 구현 예정
  // }

  const handleClickLogin = () => {
    dispatch(login());
  };

  const handleClickLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <h1>Github 로그인 테스트(통합1)</h1>
      <h1>
        Github Token :
        {' '}
        {accessToken?.github || ''}
      </h1>
      <h1>
        Firebase Token :
        {' '}
        {accessToken?.firebase || ''}
      </h1>
      <h1>
        BASE_PATH :
        {' '}
        {process.env.BASE_PATH}
      </h1>
      <h1>
        API_URL :
        {' '}
        {process.env.API_URL}
      </h1>
      <h1>
        AUTH_DOMAIN :
        {' '}
        {process.env.FIREBASE_AUTH_DOMAIN}
      </h1>
      <h1>
        UID :
        {' '}
        {userInfo?.uid || ''}
      </h1>
      <h1>
        Email :
        {' '}
        {userInfo?.email || ''}
      </h1>
      <h1>
        프사URL :
        {' '}
        {userInfo?.photoURL || ''}
      </h1>
      {localToken ? (
        <button type="button" onClick={handleClickLogout}>
          Logout
        </button>
      ) : (
        <button type="button" onClick={handleClickLogin}>
          Login
        </button>
      )}
    </>
  );
}
