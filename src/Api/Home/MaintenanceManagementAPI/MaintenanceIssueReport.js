import axios from 'axios';
BASEURL = 'http://139.180.186.103';
const IssueReport = (
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
    const formData = new FormData();
    formData.append('location_longitude', locationLongitude ?? '');
    formData.append('location_latitude', locationLatitude ?? '');
    formData.append('measure_cable_result', measureCableResult ?? false);
    formData.append(
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
    formData.append('clean_cable_result', cleanCableResult ?? false);
    formData.append('adjust_tension_cable', adjustTensionCable ?? false);
    formData.append('check_supplies', checkSupplies ?? false);
    formData.append('clean_underground_cable', cleanUndergroundCable ?? false);
    formData.append('check_preventive_cable', checkPreventiveCable ?? false);
    formData.append('check_cable_socket', checkCableSocket ?? false);
    formData.append('check_cable_odf_adapter', checkCableOdfAdapter ?? false);
    formData.append('solution_provide', solutionProvide ?? '');
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
      .post(
        `${BASEURL}/api/v1/maintenance_issue/${issueId}/issue_report`,
        formData,
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
export default IssueReport;
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
