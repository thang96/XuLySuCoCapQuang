import {Alert} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const downloadFile = async filePath => {
  let date = new Date();
  let fileUrl = filePath;
  let ext = getExtention(fileUrl);
  ext = '.' + ext[0];
  const {config, fs} = RNFetchBlob;
  let DocumentDir = fs.dirs.DownloadDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path:
        DocumentDir +
        '/document_' +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        ext,
      description: 'Document',
    },
  };
  config(options)
    .fetch('GET', fileUrl)
    .then(res => {
      console.log('res => ', JSON.stringify(res));
      Alert.alert('Download', 'Dowanload thành công');
    })
    .catch(function (error) {
      console.log(error);
      Alert.alert('Download', 'Dowanload thất bại');
    });
};
const getExtention = fileUrl => {
  return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
};
