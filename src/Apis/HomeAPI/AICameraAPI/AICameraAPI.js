import axios from 'axios';
// const BASEURL = 'http://210.245.51.29:8041/get_namecard_info';
const CutImageAPI = img => {
  let formData = new FormData();
  const imageJSON = {
    uri: img?.uri,
    type: `image/jpeg`,
    name: 'get_namecard_info.jpeg',
  };

  formData.append('img', imageJSON);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return new Promise((resole, reject) => {
    axios
      .post('http://192.168.1.12:3003/get_card_region', formData, config)
      .then(res => {
        resole(res);
      })
      .catch(function (er) {
        reject(er);
      });
  });
};
const DetailImageAPI = img => {
  let formData = new FormData();
  const imageJSON = {
    uri: img?.uri,
    type: `image/jpeg`,
    name: 'get_namecard_info.jpeg',
  };

  formData.append('image_file', imageJSON);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return new Promise((resole, reject) => {
    axios
      .post('http://210.245.51.29:8041/get_namecard_info', formData, config)
      .then(res => {
        console.log('ressssss');
        resole(res);
      })
      .catch(function (er) {
        console.log(er, 'rrrrr');
        reject(er);
      });
  });
};
const AICameraAPI = {CutImageAPI, DetailImageAPI};
export default AICameraAPI;
