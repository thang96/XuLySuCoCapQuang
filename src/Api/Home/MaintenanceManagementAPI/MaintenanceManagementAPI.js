import axios from 'axios';
const BASEURL = 'http://139.180.186.103';

const GetMaintenanceIssuesAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/maintenance_issue/`, {
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

const CreateMaintenanceIssueAPI = (
  token,
  repeat_by,
  descrip,
  required_time,
  optical_cable_id,
  user_assigned_id,
  img,
) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('repeat_by', repeat_by ?? '');
    formData.append('description', descrip ?? '');
    formData.append('required_time', required_time ?? '');
    formData.append('optical_cable_id', optical_cable_id ?? 0);
    formData.append('user_assigned_id', user_assigned_id ?? 0);
    formData.append(
      'document_file',
      {
        uri: Platform.OS === 'ios' ? '/private' + img?.path : img?.uri,
        name: getFileName(img),
        type: img?.mime,
      } ?? null,
    );
    axios
      .post(`${BASEURL}/api/v1/maintenance_issue/`, formData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
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

const GetMaintenanceIssueByIdAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/maintenance_issue/${id}`, {
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

const MaintenanceManagementAPI = {
  GetMaintenanceIssuesAPI,
  CreateMaintenanceIssueAPI,
  GetMaintenanceIssueByIdAPI,
};
export default MaintenanceManagementAPI;

const getFileName = file => {
  if (file.name !== undefined) {
    return file.name;
  } else if (file.filename !== undefined && file.filename !== null) {
    return file.filename;
  } else {
    const type = file?.mime || file?.type;
    return (
      Math.floor(Math.random() * Math.floor(999999999)) +
      '.' +
      type.split('/')[1]
    );
  }
};
