import axios from 'axios';
const BASEURL = 'https://api-capquang.iwannatechvn.com';
export const RegisterNotificationAPI = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/notification_device/register`, data, {
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
export const DeleteNotificationAPI = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASEURL}/api/v1/notification_device`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data,
      })
      .then(res => {
        resolve(res);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
