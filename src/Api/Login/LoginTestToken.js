import axios from 'axios';
BASEURL = 'https://api-capquang.iwannatechvn.com/';
const QUERY = '/api/v1/login/test-token';
const LoginTestToken = token => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}${QUERY}`, null, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};
export default LoginTestToken;
