import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { login, setAccessToken, logout } from './common/slice';

import { loadItem } from './services/storage/localStorage';

import { get } from './common/utils';

export default function App() {
  const dispatch = useDispatch();

  const localToken = loadItem('accessToken');

  if (localToken) {
    // TODO : Token에 해당하는 유저 정보 DB에서 가져와서 자동 로그인시키기
    dispatch(setAccessToken(localToken));
  }

  const accessToken = useSelector(get('accessToken'));
  const userInfo = useSelector(get('userInfo'));

  const handleClickLogin = () => {
    dispatch(login());
  };

  const handleClickLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <h1>
        Gihtub 로그인 테스트
      </h1>
      <h1>
        Token :
        {' '}

        {accessToken || ''}
      </h1>
      <h1>
        ID :
        {' '}
        {userInfo ? userInfo.id : '' }
      </h1>
      <h1>
        프로필 사진 URL :
        {' '}
        {userInfo ? userInfo.img : '' }
      </h1>
      {accessToken
        ? <button type="button" onClick={handleClickLogout}>Logout</button>
        : <button type="button" onClick={handleClickLogin}>Login</button>}

    </>
  );
}
