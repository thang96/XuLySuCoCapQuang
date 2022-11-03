import axios from 'axios';
const BASEURL = 'http://139.180.186.103';

const GetUsersAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/users/`, {
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

const GetUsersByIdAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/users/${id}`, {
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
const UsersAPI = {GetUsersAPI, GetUsersByIdAPI};
export default UsersAPI;
