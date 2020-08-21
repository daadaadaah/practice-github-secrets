import {
  postUserInfo,
  fetchGithubUserInfo,
} from './api';

describe('api', () => {
  const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() { return data; },
    });
  };

  describe('postUserInfo', () => {
    beforeEach(() => {
      mockFetch({
        uid: 'uid',
        email: 'email',
        photoURL: 'photoURL',
      });
    });

    it('returns userInfo', async () => {
      const userInfo = await postUserInfo({
        uid: 'uid',
        email: 'email',
        photoURL: 'photoURL',
      });

      expect(userInfo).toEqual(userInfo);
    });
  });

  describe('fetchGithubUserInfo', () => {
    beforeEach(() => {
      mockFetch({});
    });

    it('returns restaurants', async () => {
      const githubUserInfo = await fetchGithubUserInfo('GITHUB_ACCESS_TOKEN');

      expect(githubUserInfo).toEqual({});
    });
  });
});
