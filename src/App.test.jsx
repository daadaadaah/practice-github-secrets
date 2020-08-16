import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import { login, setAccessToken, logout } from './common/slice';

import { loadItem } from './services/storage/localStorage';

import App from './App';

jest.mock('react-redux');
jest.mock('./common/slice');
jest.mock('./services/firebase/firebase.js');
jest.mock('./services/storage/localStorage');

describe('<App />', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);
  });

  context('without accessToken', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        accessToken: '',
        userInfo: null,
      }));
    });

    it('show Login button', () => {
      const { container, getByText } = render(
        <App />,
      );
      expect(dispatch).toBeCalledTimes(0);

      expect(container).toHaveTextContent('Gihtub 로그인 테스트');

      fireEvent.click(getByText('Login'));

      expect(dispatch).toBeCalledWith(login());
    });
  });

  context('with accessToken', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        accessToken: 'ACCESS_TOKEN',
        userInfo: {
          id: 'devlink',
          img: 'dev@link.com',
        },
      }));

      loadItem.mockImplementation(() => 'ACCESS_TOKEN');
    });

    it('show Logout button', () => {
      const { container, getByText } = render(
        <App />,
      );

      expect(dispatch).toBeCalledWith(setAccessToken('ACCESS_TOKEN'));

      // TODO : Token에 해당하는 유저 정보 DB에서 가져와서 자동 로그인시키기

      expect(container).toHaveTextContent('Gihtub 로그인 테스트');

      expect(container).toHaveTextContent('devlink');

      expect(container).toHaveTextContent('dev@link.com');

      expect(container).toHaveTextContent('Logout');

      fireEvent.click(getByText('Logout'));

      expect(dispatch).toBeCalledWith(logout());
    });
  });
});
