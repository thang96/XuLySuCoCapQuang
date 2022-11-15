import axios from 'axios';
const BASEURL = 'http://210.245.51.29:8088';

const PostUserTokenAPI = data => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/auth/login`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
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
const GetVerifyTokenAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/auth/verify-token`, {
        headers: {
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
const LoginAPI = {PostUserTokenAPI, GetVerifyTokenAPI};
export default LoginAPI;
