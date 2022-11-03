import axios from 'axios';
const URLLGETWORKLIST = 'http://139.180.186.103/api/v1/issues/';
const GetWorkListAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(URLLGETWORKLIST, {
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
export default GetWorkListAPI;
