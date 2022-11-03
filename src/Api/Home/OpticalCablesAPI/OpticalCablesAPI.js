import axios from 'axios';
const BASEURL = 'http://139.180.186.103';

const GetOpticalCablesAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/optical_cables/`, {
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

const CreateOpticalCablesAPI = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/optical_cables/`, data, {
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

const GetOpticalCablesByIdAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/optical_cables/${id}`, {
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
const UpdateOpticalCablesAPI = (token, data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/api/v1/optical_cables/${id}`, data, {
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
const OpticalCablesAPI = {
  GetOpticalCablesAPI,
  CreateOpticalCablesAPI,
  GetOpticalCablesByIdAPI,
  UpdateOpticalCablesAPI,
};
export default OpticalCablesAPI;
