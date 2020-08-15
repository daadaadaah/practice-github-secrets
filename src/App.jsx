import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { login } from './common/slice';
import { get } from './common/utils';

export default function App() {
  const dispatch = useDispatch();

  const accessToken = useSelector(get('accessToken'));
  const userInfo = useSelector(get('userInfo'));

  const handleClickLogin = () => {
    dispatch(login());
  };

  return (
    <>
      <h1>Gihtub 로그인 테스트</h1>
      <h1>
        토큰 :
        {' '}

        {accessToken || ''}
      </h1>
      <h1>
        유저 ID :
        {' '}
        {userInfo ? userInfo.id : '' }
      </h1>
      <h1>
        유저 email :
        {' '}
        {userInfo ? userInfo.img : '' }
      </h1>
      <button type="button" onClick={handleClickLogin}>Login</button>

    </>
  );
}
