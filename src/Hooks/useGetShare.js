import React, {useEffect, useState} from 'react';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
export default function useGetShare() {
  const [files, setFiles] = useState(null);
  useEffect(() => {
    try {
      ReceiveSharingIntent.getReceivedFiles(
        files => {
          setFiles(files);
          //[{ filePath: null, text: null, weblink: null, mimeType: null, contentUri: null, fileName: null, extension: null }]
        },
        error => {
          // console.log(error);
        },
        'ZzigerShareMedia', // share url protocol (must be unique to your app, suggest using your apple bundle id)
      );

      // return () => {
      //   ReceiveSharingIntent.clearReceivedFiles();
      // };
    } catch (error) {
      // console.log(error);
    }

    // To clear Intents
  }, []);

  return files;
}
