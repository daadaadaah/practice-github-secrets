import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import { login } from './common/slice';

import App from './App';

jest.mock('react-redux');
jest.mock('./common/slice');
jest.mock('./services/firebase/firebase.js');

test('<App />', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  useSelector.mockImplementation((selector) => selector({
    accessToken: '',
    userInfo: null,
  }));

  const { container, getByText } = render(
    <App />,
  );

  expect(container).toHaveTextContent('Gihtub 로그인 테스트');

  fireEvent.click(getByText('Login'));

  expect(dispatch).toBeCalledWith(login());
});
