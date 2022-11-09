import axios from 'axios';
BASEURL = 'https://api-capquang-dev.iwannatechvn.com';

const ReadUserAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/users/me`, {
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

const UpdateUserAvatarAPI = async (token, img) => {
  const formData = new FormData();
  formData.append('image', {
    uri: Platform.OS === 'ios' ? '/private' + img?.path : img?.uri,
    name: img?.name,
    type: img?.type,
  });

  return new Promise((resole, reject) => {
    axios
      .post(`${BASEURL}/api/v1/users/me/avatar`, formData, {
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
        reject(errors);
      });
  });
};

const AccountAPI = {ReadUserAPI, UpdateUserAvatarAPI};
export default AccountAPI;

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
