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
const GetListMaintenanceIssuesReportAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/maintenance_issue/`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: {
          optical_cable_id: id,
          issue_status_code: 'COMPLETION',
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
  optical_cable_id,
  user_assigned_id,
  albumImage,
) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('repeat_by', repeat_by ?? 'MONTHLY');
    formData.append('description', descrip ?? '');
    formData.append('optical_cable_id', optical_cable_id ?? 0);
    formData.append('user_assigned_id', user_assigned_id ?? 0);
    for (let i = 0; i < albumImage.length; i++) {
      const element = albumImage[i];
      formData.append('document_files', {
        uri: element?.uri,
        name: element?.name,
        type: element?.type,
      });
    }
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
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/maintenance_issue/${id}/receive`, id, {
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
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/maintenance_issue/${id}/reject`, null, {
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
const DeleteMaintenanceIssueByIdAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASEURL}/api/v1/maintenance_issue/${id}`, {
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
  documentFiles,
) => {
  return new Promise((resolve, reject) => {
    const formDataReport = new FormData();
    formDataReport.append('measure_cable_result', measureCableResult ?? false);
    for (let i = 0; i < measureCableResultDocument.length; i++) {
      let image = measureCableResultDocument[i];
      formDataReport.append('measure_cable_result_document_files', {
        uri: image?.uri,
        name: image?.name,
        type: image?.type,
      });
    }
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

    for (let i = 0; i < documentFiles.length; i++) {
      let imageDoc = documentFiles[i];
      formDataReport.append('document_files', {
        uri: imageDoc?.uri,
        name: imageDoc?.name,
        type: imageDoc?.type,
      });
    }
    console.log(formDataReport);
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
  GetListMaintenanceIssuesReportAPI,
  CreateMaintenanceIssueAPI,
  ReceiveMaintenanceIssueAPI,
  RejectMaintenanceIssueAPI,
  AcceptanceMaintenanceRequestAPI,
  GetMaintenanceIssueByIdAPI,
  DeleteMaintenanceIssueByIdAPI,
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
