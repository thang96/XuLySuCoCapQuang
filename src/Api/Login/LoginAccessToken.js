import axios from 'axios';
BASEURL = 'http://139.180.186.103';
const QUERY = '/api/v1/login/access-token';
const LoginAccessToken = (username, password) => {
  const formData = new FormData();
  formData.append('username', username ?? '');
  formData.append('password', password ?? '');
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}${QUERY}`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
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
export default LoginAccessToken;