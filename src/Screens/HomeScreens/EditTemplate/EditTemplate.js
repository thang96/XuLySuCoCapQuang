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
  Modal,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomAppbar from '../../../Components/CustomAppBar';
import CustomButton from '../../../Components/CustomButton';
import CustomButtonLogo from '../../../Components/CustomButtonLogo';
import CustomTwoButtonFuntion from '../../../Components/CustomTwoButtonFuntion';
import CustomTextInput from '../../../Components/CustomTextInput';
import {colors, icons, images} from '../../../Constants';
import CustomModaViewManuscriptSelete from '../../../Components/CustomModaViewManuscriptSelete';
import CustomModalChangeColor from '../../../Components/CustomModalEditTemplate/CustomModalChangeColor';
import CustomModalChooseThemeTemplate from '../../../Components/CustomModalEditTemplate/CustomModalChooseThemeTemplate';
const EditTemplate = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isFront, setIsFront] = useState(true);
  const imageWidth = Dimensions.get('window').width - 20;
  const frontCardStore = useSelector(state => state.card.frontCard);
  const backOfCardStore = useSelector(state => state.card.backOfCard);
  const shareCardStore = useSelector(state => state.card.shareCard);
  const [modalSelete, setModalSelete] = useState(false);
  const [modalChangeColor, setModalChangeColor] = useState(false);
  const [modalChangeTheme, setModalChangeTheme] = useState(false);
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
  return (
    <View style={styles.container}>
      <CustomAppbar
        styleAppBar={{paddingHorizontal: 8}}
        iconLeft={icons.ic_back}
        iconRight2={icons.ic_bell}
        iconRight1={icons.ic_shopping}
        title={'View Manuscript'}
        onPressLeftIcon={() => navigation.goBack()}
      />
      <View style={{paddingHorizontal: 10}}>
        <CustomTwoButtonFuntion
          titleLeft={'Front'}
          titleRight={'Back'}
          styleTwoButton={{height: 40, marginVertical: 20}}
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
        <Image
          source={{uri: isFront ? frontCard : backOfCard}}
          style={{
            width: imageWidth,
            height: imageWidth / 1.8,
            marginBottom: 10,
          }}
          resizeMode={'cover'}
        />
      </View>

      <View style={styles.eachContainer}>
        <CustomModalChangeColor
          modalVisible={modalChangeColor}
          onRequestClose={() => setModalChangeColor(false)}
          closeModal={() => setModalChangeColor(false)}
        />
        <CustomModalChooseThemeTemplate
          modalVisible={modalChangeTheme}
          onRequestClose={() => setModalChangeTheme(false)}
          closeModal={() => setModalChangeTheme(false)}
        />
        <CustomModaViewManuscriptSelete
          titleTop={'Edit'}
          secondIconTop={icons.ic_checkGreen}
          firtTitle={'Background color change'}
          firtIcon={icons.ic_colors}
          secondTitle={'Choose theme template'}
          secondIcon={icons.ic_template}
          modalVisible={modalSelete}
          onRequestClose={() => setModalSelete(false)}
          closeModal={() => setModalSelete(false)}
          firtOnpress={() => {
            setModalSelete(false);
            setModalChangeColor(true);
          }}
          secondOnpress={() => {
            setModalSelete(false);
            setModalChangeTheme(true);
          }}
        />

        {!modalChangeColor && (
          <ScrollView style={{paddingHorizontal: 10}}>
            <View style={styles.viewRow}>
              <CustomButton
                title={'ASSIGN DESIGN'}
                styleButton={styles.styleCustomButton}
                styleText={styles.styleTextCustomButton}
              />
              <CustomButtonLogo
                source={icons.ic_editModal}
                styleButton={styles.styleIcon}
                onPress={() => setModalSelete(true)}
              />
            </View>
            <Text style={styles.title}>이름</Text>
            <CustomTextInput
              styleViewInput={styles.styleCustomTextInput}
              placeholder={'홍길동'}
            />
            <CustomTextInput
              styleViewInput={styles.styleCustomTextInput}
              placeholder={'총괄팀장'}
            />
            <CustomTextInput
              styleViewInput={styles.styleCustomTextInput}
              placeholder={'주식회사 프린파크'}
            />
            <CustomTextInput
              styleViewInput={styles.styleCustomTextInput}
              placeholder={'광고마케팅팀'}
            />
            <Text style={styles.title}>주소</Text>
            <CustomTextInput
              styleViewInput={styles.styleCustomTextInput}
              placeholder={'주소'}
            />

            <Text style={styles.title}>전화번호</Text>
            <CustomTextInput
              styleViewInput={styles.styleCustomTextInput}
              placeholder={'전화번호'}
              instructionText={'T'}
            />
            <Text style={styles.title}>팩스</Text>
            <CustomTextInput
              styleViewInput={styles.styleCustomTextInput}
              placeholder={'팩스'}
              instructionText={'F'}
            />
            <Text style={styles.title}>휴대폰</Text>
            <CustomTextInput
              styleViewInput={styles.styleCustomTextInput}
              placeholder={'휴대폰'}
              instructionText={'M'}
            />
            <Text style={styles.title}>이메일</Text>
            <CustomTextInput
              styleViewInput={styles.styleCustomTextInput}
              placeholder={'이메일'}
              instructionText={'E'}
            />
            <Text style={styles.title}>홈페이지</Text>
            <CustomTextInput
              styleViewInput={styles.styleCustomTextInput}
              placeholder={'홈페이지'}
              instructionText={'H'}
            />
            <CustomTextInput
              styleViewInput={styles.styleCustomTextInput}
              placeholder={'홈페이지'}
            />
          </ScrollView>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  eachContainer: {
    flex: 1,
    backgroundColor: colors.backgroundInput,
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
  styleIcon: {height: 30, width: 30},
  styleCustomButton: {
    height: 40,
    width: 130,
    backgroundColor: colors.backgroundButtonRed,
    borderRadius: 10,
  },
  styleTextCustomButton: {color: 'white', fontSize: 14, fontWeight: 'bold'},
  title: {fontSize: 18, fontWeight: 'bold', color: 'black'},
  styleCustomTextInput: {
    backgroundColor: 'white',
    height: 45,
    borderRadius: 10,
    marginVertical: 5,
  },
});
export default EditTemplate;
