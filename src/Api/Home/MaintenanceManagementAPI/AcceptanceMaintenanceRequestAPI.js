import axios from 'axios';
const BASEURL = 'http://139.180.186.103';
const AcceptanceMaintenanceRequestAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/maintenance_issue/${id}/accept`, null, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
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
export default AcceptanceMaintenanceRequestAPI;
