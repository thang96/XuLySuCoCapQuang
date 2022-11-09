import axios from 'axios';
const BASEURL = 'https://api-capquang-dev.iwannatechvn.com';

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

const ReceiveMaintenanceIssueAPI = (token, id) => {
  const formData = new FormData();
  formData.append('id', parseInt(id) ?? 0);
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/maintenance_issue/${id}/receive`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
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

const RejectMaintenanceIssueAPI = (token, id) => {
  const formData = new FormData();
  formData.append('id', parseInt(id) ?? 0);
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/maintenance_issue/${id}/reject`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
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
const MaintenanceIssueReportDetailAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/maintenance_issue/${id}/maintenance-report`, {
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
const MaintenanceIssueReportAPI = (
  token,
  issueId,
  locationLongitude,
  locationLatitude,
  measureCableResult,
  measureCableResultDocument,
  cleanCableResult,
  adjustTensionCable,
  checkSupplies,
  cleanUndergroundCable,
  checkPreventiveCable,
  checkCableSocket,
  checkCableOdfAdapter,
  solutionProvide,
  reportDocument,
) => {
  return new Promise((resolve, reject) => {
    const formDataReport = new FormData();
    formDataReport.append('location_longitude', locationLongitude ?? '');
    formDataReport.append('location_latitude', locationLatitude ?? '');
    formDataReport.append('measure_cable_result', measureCableResult ?? false);
    formDataReport.append(
      'measure_cable_result_document',
      {
        uri:
          Platform.OS === 'ios'
            ? '/private' + measureCableResultDocument?.path
            : measureCableResultDocument?.uri,
        name: getFileName(measureCableResultDocument),
        type: measureCableResultDocument?.mime,
      } ?? null,
    );
    formDataReport.append('clean_cable_result', cleanCableResult ?? false);
    formDataReport.append('adjust_tension_cable', adjustTensionCable ?? false);
    formDataReport.append('check_supplies', checkSupplies ?? false);
    formDataReport.append(
      'clean_underground_cable',
      cleanUndergroundCable ?? false,
    );
    formDataReport.append(
      'check_preventive_cable',
      checkPreventiveCable ?? false,
    );
    formDataReport.append('check_cable_socket', checkCableSocket ?? false);
    formDataReport.append(
      'check_cable_odf_adapter',
      checkCableOdfAdapter ?? false,
    );
    formDataReport.append('solution_provide', solutionProvide ?? '');
    formDataReport.append(
      'report_document',
      {
        uri:
          Platform.OS === 'ios'
            ? '/private' + reportDocument?.path
            : reportDocument?.uri,
        name: getFileName(reportDocument),
        type: reportDocument?.mime,
      } ?? null,
    );
    axios
      .post(
        `${BASEURL}/api/v1/maintenance_issue/${issueId}/maintenance-report`,
        formDataReport,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
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
  ReceiveMaintenanceIssueAPI,
  RejectMaintenanceIssueAPI,
  AcceptanceMaintenanceRequestAPI,
  GetMaintenanceIssueByIdAPI,
  MaintenanceIssueReportDetailAPI,
  MaintenanceIssueReportAPI,
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
