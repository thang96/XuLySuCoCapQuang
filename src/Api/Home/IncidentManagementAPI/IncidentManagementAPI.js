import axios from 'axios';
const BASEURL = 'http://139.180.186.103';

const GetListIssuesAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/issues/`, {
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

const CreateIssuesRequestAPI = (
  token,
  descrip,
  required_time,
  optical_cable_id,
  user_assigned_id,
  img,
) => {
  return new Promise((resolve, reject) => {
    const formDataCreate = new FormData();
    formDataCreate.append('description', descrip ?? '');
    formDataCreate.append('required_time', required_time ?? '');
    formDataCreate.append('optical_cable_id', optical_cable_id ?? 0);
    formDataCreate.append('user_assigned_id', user_assigned_id ?? 0);
    formDataCreate.append(
      'document_file',
      {
        uri: Platform.OS === 'ios' ? '/private' + img?.path : img?.uri,
        name: getFileName(img),
        type: img?.type,
      } ?? null,
    );
    axios
      .post(`${BASEURL}/api/v1/issues/`, formDataCreate, {
        headers: {
          accept: 'application/json',
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

const GetIncidentIssueByIdAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/issues/${id}`, {
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

const ReceiveIssueAPI = (token, id) => {
  const formData = new FormData();
  formData.append('id', parseInt(id) ?? 0);
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/issues/${id}/receive`, formData, {
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

const RejectIssueAPI = (token, id) => {
  const formData = new FormData();
  formData.append('id', parseInt(id) ?? 0);
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/issues/${id}/reject`, formData, {
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

const AcceptIssueRequestAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/issues/${id}/accept`, null, {
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

const DetailIssueReportAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/issues/${id}/issue_report`, {
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

const IssueReportAPI = (
  token,
  issueId,
  startTime,
  finishTime,
  totalProcessingTime,
  locationLongitude,
  locationLatitude,
  reason,
  solution,
  reportDocument,
) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append('start_time', startTime ?? '');
    formData.append('finish_time', finishTime ?? '');
    formData.append(
      'total_processing_time',
      parseFloat(totalProcessingTime) ?? 0,
    );
    formData.append('location_longitude', `${locationLongitude}` ?? '');
    formData.append('location_latitude', `${locationLatitude}` ?? '');
    formData.append('reason', reason ?? '');
    formData.append('solution', solution ?? '');
    formData.append(
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
      .post(`${BASEURL}/api/v1/issues/${issueId}/issue_report`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
const ExportIssueAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/issues/export/`, {
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

const IncidentManagementAPI = {
  GetListIssuesAPI,
  CreateIssuesRequestAPI,
  GetIncidentIssueByIdAPI,
  ReceiveIssueAPI,
  RejectIssueAPI,
  AcceptIssueRequestAPI,
  DetailIssueReportAPI,
  IssueReportAPI,
  ExportIssueAPI,
};
export default IncidentManagementAPI;

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
