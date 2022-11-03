import axios from 'axios';
const BASEURL = 'http://139.180.186.103';
const QUERY = '/api/v1/maintenance_issue/';
const GetWorkMaintenanceListAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}${QUERY}`, {
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
export default GetWorkMaintenanceListAPI;
