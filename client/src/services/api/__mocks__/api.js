export async function postUserInfo({ uid, email, photoURL }) {
  return {
    message: 'mockmessage',
    body: {
      uid, email, photoURL,
    },
  };
}

export async function fetchGithubUserInfo() {
  return {};
}
