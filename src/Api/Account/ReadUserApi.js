import axios from 'axios';
BASEURL = 'https://api-capquang-dev.iwannatechvn.com';
const QUERY = '/api/v1/users/me';
const ReadUserApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}${QUERY}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
export default ReadUserApi;
