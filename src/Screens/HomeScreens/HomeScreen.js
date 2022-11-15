import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  AppState,
} from 'react-native';
import CustomButtonLogo from '../../Components/CustomButtonLogo';
import CustomButton from '../../Components/CustomButton';
import {colors, icons, images} from '../../Constants';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import common from '../../Utils/common';
import CustomModalCamera from '../../Components/CustomModalCamera';
// import {postImg} from '../../Apis/HomeAPI';
import useGetShare from '../../Hooks/useGetShare';
import CustomLoading from '../../Components/CustomLoading';
import {
  addBackOfCard,
  addFrontCard,
  addShareCard,
} from '../../Stores/slices/cardSlice';
import {useDispatch, useSelector} from 'react-redux';
import AICameraAPI from '../../Apis/HomeAPI/AICameraAPI/AICameraAPI';

const HomeScreen = () => {
  const navigation = useNavigation();
  const heightViewBottom = Dimensions.get('window').height - 250;
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const frontCardStore = useSelector(state => state.card.frontCard);
  const backOfCardStore = useSelector(state => state.card.backOfCard);

  const files = useGetShare();
  useEffect(() => {
    if (files !== null && files !== undefined) {
      dispatch(addShareCard(files[0]));
      navigation.navigate('ChooseTypeOfBusinessCard');
    }
  }, [files]);

  const openGallery = () => {
    setModalVisible(false);
    ImagePicker.openPicker({width: 300, height: 400, cropping: true})
      .then(async image => {
        console.log(image);
        const imageConverted1 = await common.resizeImageNotVideo(image);
        console.log(imageConverted1, 'image');
        await AICameraAPI.CutImageAPI(imageConverted1)
          .then(data => {
            // dispatch(addFrontCard(imageConverted1));
            console.log(data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        ImagePicker.clean();
      });
  };
  return (
    <View style={styles.container}>
      {modalVisible && (
        <View style={styles.styleModal}>
          <CustomModalCamera
            openCamera={() => {
              navigation.navigate('CameraHome');
              // navigation.navigate('ChooseTypeOfBusinessCard');
              setModalVisible(false);
            }}
            selectGallery={() => {
              openGallery();
            }}
            modalVisible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
            cancel={() =>
              setModalVisible(prev => (prev == false ? true : false))
            }
          />
        </View>
      )}
      <ImageBackground
        style={styles.container}
        source={images.backgroundZ}
        resizeMode={'cover'}>
        <CustomButtonLogo
          styleButton={styles.customButtonLogo}
          source={icons.ic_buttonCamera}
          onPress={() =>
            setModalVisible(prev => (prev == false ? true : false))
          }
        />

        <View style={[styles.viewBottom, {height: heightViewBottom}]}>
          <Text style={styles.title}>Build your personal brand</Text>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <Image
              source={icons.ic_star}
              style={{height: 25, width: 25}}
              resizeMode={'cover'}
            />
            <Image
              source={icons.ic_star}
              style={{height: 25, width: 25, marginHorizontal: 5}}
              resizeMode={'cover'}
            />
            <Image
              source={icons.ic_star}
              style={{height: 25, width: 25}}
              resizeMode={'cover'}
            />
          </View>
          <Text
            style={
              styles.content
            }>{`Lorem ipsum is simple dummy text of the printing and typesetting industry.`}</Text>
          <View style={styles.viewRow}>
            <CustomButton
              styleButton={styles.customButton}
              title={'Category 1'}
              styleText={styles.textCustomButton}
              onPress={() => navigation.navigate('ChooseTypeOfBusinessCard')}
            />
            <CustomButton
              styleButton={styles.customButton}
              title={'Category 2'}
              styleText={styles.textCustomButton}
              onPress={() => setCreateImage(true)}
            />
            <CustomButton
              styleButton={styles.customButton}
              title={'Category 3'}
              styleText={styles.textCustomButton}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customButtonLogo: {
    marginTop: 200,
    height: 120,
    width: 120,
    alignSelf: 'center',
    zIndex: 3,
  },
  viewBottom: {
    backgroundColor: 'white',
    zIndex: 2,
    width: '100%',
    position: 'absolute',
    top: 250,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: 'center',
    paddingTop: 80,
  },
  title: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    textAlign: 'center',
    fontSize: 16,
    width: '95%',
    color: 'grey',
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    width: '100%',
    paddingHorizontal: 10,
  },
  customButton: {
    height: 50,
    width: 100,
    borderRadius: 10,
    backgroundColor: colors.backgroundButton,
  },
  textCustomButton: {
    color: 'white',
    fontWeight: 'bold',
  },
  styleModal: {
    backgroundColor: 'rgba(119,119,119,0.7)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  camera: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 9999,
  },
});
export default HomeScreen;
