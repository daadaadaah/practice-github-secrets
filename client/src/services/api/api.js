// process.env.API_URL : https://********-dev.cloudfunctions.net/api
export async function postUserInfo({ uid, email, photoURL }) {
  const url = `${process.env.API_URL}/auth/login`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid, email, photoURL }),
  });
  const data = await response.json();
  return data;
}

export async function fetchGithubUserInfo(accessToken) {
  const url = 'https://api.github.com/user';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${accessToken}`,
    },
  });

  const data = await response.json();
  return data;
}
