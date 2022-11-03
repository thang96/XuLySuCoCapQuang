import axios from 'axios';
BASEURL = 'http://139.180.186.103';
const QUERY = '/api/v1/users/me/avatar';
export const UpdateAvatar = async (token, img) => {
  const formData = new FormData();
  formData.append('image', {
    uri: Platform.OS === 'ios' ? '/private' + img?.path : img?.uri,
    name: getFileName(img),
    type: img?.mime,
  });

  return new Promise((resole, reject) => {
    axios
      .post(`${BASEURL}${QUERY}`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resole(res);
      })
      .catch(errors => {
        console.log('6767', errors, Object.keys(errors));
        reject(errors);
      });
  });
};
export default UpdateAvatar;
function getFileName(file) {
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
}
