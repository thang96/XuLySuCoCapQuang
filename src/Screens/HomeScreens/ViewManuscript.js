import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  FlatList,
  Dimensions,
} from 'react-native';
import {icons, colors, images} from '../../Constants';
import CustomButtonLogo from '../../Components/CustomButtonLogo';
import CustomButton from '../../Components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import CustomModalShowImage from '../../Components/CustomModalShowImage';
import CustomTwoButtonFuntion from '../../Components/CustomTwoButtonFuntion';
import CustomModaViewManuscriptSelete from '../../Components/CustomModaViewManuscriptSelete';
import CustomModalNotification from '../../Components/CustomModalNotification';
import CustomModalCamera from '../../Components/CustomModalCamera';
import ImagePicker from 'react-native-image-crop-picker';
import CustomLoading from '../../Components/CustomLoading';
import common from '../../Utils/common';
import {addBackOfCard} from '../../Stores/slices/cardSlice';
import CustomAppbar from '../../Components/CustomAppBar';
const ViewManuscript = props => {
  const imageWidth = Dimensions.get('window').width - 20;
  const frontCardStore = useSelector(state => state.card.frontCard);
  const backOfCardStore = useSelector(state => state.card.backOfCard);
  const shareCardStore = useSelector(state => state.card.shareCard);

  const [createImage, setCreateImage] = useState(false);
  const [frontCard, setFrontCard] = useState(null);
  useEffect(() => {
    shareCardStore?.contentUri
      ? setFrontCard(shareCardStore?.contentUri)
      : setFrontCard(
          Platform.OS === 'ios' ? frontCardStore?.path : frontCardStore?.uri,
        );
  }, []);
  const backOfCard =
    Platform.OS === 'ios' ? backOfCardStore?.path : backOfCardStore?.uri;
  const navigation = useNavigation();
  const [isFront, setIsFront] = useState(true);
  const [modalShowImage, setModalShowImage] = useState(false);
  const [modalSelete, setModalSelete] = useState(false);
  const [modalNotify, setModalNotify] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const renderFrontCard = () => {
    return (
      <View>
        <View>
          <View style={styles.viewRow}>
            <Text style={styles.title}>Original Template</Text>
            <CustomButton
              title={'선택'}
              styleText={styles.textCustomButton}
              onPress={() => setModalSelete(true)}
            />
          </View>
          <Image
            source={{uri: frontCard}}
            style={{width: imageWidth, height: imageWidth / 1.8}}
            resizeMode={'cover'}
          />
        </View>
        <View>
          <View style={styles.viewRow}>
            <Text style={styles.title}>Suggestion Template</Text>
            <CustomButton
              title={'선택'}
              styleText={styles.textCustomButton}
              onPress={() => setModalSelete(true)}
            />
          </View>
          <Image
            source={{uri: frontCard}}
            style={{width: imageWidth, height: imageWidth / 1.8}}
            resizeMode={'cover'}
          />
        </View>
      </View>
    );
  };
  const renderBackOfCard = () => {
    return (
      <View>
        <View>
          <View style={styles.viewRow}>
            <Text style={styles.title}>Original Template</Text>
            <CustomButton
              title={'선택'}
              styleText={styles.textCustomButton}
              onPress={() => setModalSelete(true)}
            />
          </View>
          {backOfCard ? (
            <Image
              source={{uri: backOfCard}}
              style={{width: imageWidth, height: imageWidth / 1.8}}
              resizeMode={'cover'}
            />
          ) : (
            <CustomButtonLogo
              source={icons.ic_rotate}
              styleButton={{
                width: imageWidth,
                height: imageWidth / 1.8,
                backgroundColor: 'rgb(248,253,255)',
              }}
              onPress={() =>
                setModalVisible(prev => (prev == false ? true : false))
              }
            />
          )}
        </View>
        <View>
          <View style={styles.viewRow}>
            <Text style={styles.title}>Suggestion Template</Text>
            <CustomButton
              title={'선택'}
              styleText={styles.textCustomButton}
              onPress={() => setModalSelete(true)}
            />
          </View>
          {backOfCard ? (
            <Image
              source={{uri: backOfCard}}
              style={{width: imageWidth, height: imageWidth / 1.8}}
              resizeMode={'cover'}
            />
          ) : (
            <CustomButtonLogo
              source={icons.ic_rotate}
              styleButton={{
                width: imageWidth,
                height: imageWidth / 1.8,
                backgroundColor: 'rgb(248,253,255)',
              }}
              onPress={() =>
                setModalVisible(prev => (prev == false ? true : false))
              }
            />
          )}
        </View>
      </View>
    );
  };
  const pickSingleWithCamera = () => {
    setCreateImage(true);
    setModalVisible(false);
    ImagePicker.openCamera({
      cropperToolbarTitle: 'Back of card',
    })
      .then(async image => {
        const imageConverted1 = await common.resizeImageNotVideo(image);
        dispatch(addBackOfCard(imageConverted1));
        setCreateImage(false);
      })
      .catch(e => {
        ImagePicker.clean();
        setCreateImage(false);
      });
  };
  const openGallery = () => {
    setCreateImage(true);
    ImagePicker.openPicker({})
      .then(async image => {
        const imageConverted1 = await common.resizeImageNotVideo(image);
        await postImg(imageConverted1).then(data => {
          // navigation.navigate('', {
          //   cardFront: imageConverted1,
          //   cardImg: data,
          // });
          setSendImage(false);
        });
      })
      .catch(e => {
        ImagePicker.clean();
        setCreateImage(false);
      });
  };
  if (createImage) {
    return <CustomLoading />;
  }

  return (
    <View style={styles.container}>
      {modalVisible && (
        <View style={styles.styleModal}>
          <CustomModalCamera
            openCamera={() => {
              pickSingleWithCamera();
              setModalVisible(false);
            }}
            selectGallery={() => {
              openGallery();
              setModalVisible(false);
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
      {modalNotify && (
        <View style={styles.styleModal}>
          <CustomModalNotification
            source={icons.ic_happy}
            title={'Thank you for your order'}
            content={'by clicking the pay button,\nyou agree to our items'}
            titleButton={'PAYMENT'}
            modalVisible={modalNotify}
            onRequestClose={() => setModalNotify(false)}
            onPress={() => {
              setModalNotify(false);
              navigation.navigate('OrdersScreen');
            }}
          />
        </View>
      )}
      {modalShowImage && (
        <View>
          <CustomModalShowImage
            source={isFront ? frontCard : backOfCard}
            modalVisible={modalShowImage}
            onRequestClose={() => {
              setModalShowImage(false);
            }}
            onPress={() => setModalShowImage(false)}
          />
        </View>
      )}
      {modalSelete && (
        <View style={styles.styleModal}>
          <CustomModaViewManuscriptSelete
            firtTitle={'Oder'}
            firtIcon={icons.ic_shoppingModal}
            secondTitle={'Edit'}
            secondIcon={icons.ic_editModal}
            iconTop={icons.ic_order}
            thirdTitle={'Record images'}
            thirdIcon={icons.ic_cameraModal}
            secondIconTop={icons.ic_checkGreen}
            fourthTitle={'Rotate'}
            fourthIcon={icons.ic_rotate}
            modalVisible={modalSelete}
            onRequestClose={() => setModalSelete(false)}
            closeModal={() => setModalSelete(false)}
            firtOnpress={() => {
              setModalSelete(false);
              setModalNotify(true);
            }}
            secondOnpress={() => {
              setModalSelete(false);
              navigation.navigate('EditNavigation');
            }}
            thirdOnpress={() => {
              setModalSelete(false);
            }}
            fourthOnpress={() => {
              setModalShowImage(true);
            }}
          />
        </View>
      )}

      <CustomAppbar
        styleAppBar={{paddingHorizontal: 8, marginBottom: 20}}
        iconLeft={icons.ic_back}
        iconRight2={icons.ic_bell}
        iconRight1={icons.ic_shopping}
        title={'View Manuscript'}
        onPressLeftIcon={() => navigation.goBack()}
      />
      <ScrollView style={styles.eachContainer}>
        <CustomTwoButtonFuntion
          titleLeft={'Front'}
          titleRight={'Back'}
          styleTwoButton={{height: 40}}
          styleButtonLeft={[
            {
              backgroundColor: isFront
                ? colors.backgroundButton
                : colors.backgroundInput,
            },
            styles.styleButtonLeft,
          ]}
          styleButtonRight={[
            {
              backgroundColor: !isFront
                ? colors.backgroundButton
                : colors.backgroundInput,
            },
            ,
            styles.styleButtonRight,
          ]}
          onPressLeft={() => setIsFront(true)}
          onPressRight={() => setIsFront(false)}
        />

        {isFront && renderFrontCard()}
        {!isFront && renderBackOfCard()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  styleButtonLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  styleButtonRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  title: {
    color: 'black',
    fontWeight: '900',
    fontSize: 16,
  },
  textCustomButton: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  styleModal: {
    backgroundColor: 'rgba(119,119,119,0.7)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
});
export default ViewManuscript;
