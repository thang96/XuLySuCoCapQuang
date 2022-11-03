import axios from 'axios';
const BASEURL = 'http://139.180.186.103';
const QUERY = '/api/v1/maintenance_issue/';
const GetMaintenanceIssueByIdAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}${QUERY}${id}`, {
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
export default GetMaintenanceIssueByIdAPI;
