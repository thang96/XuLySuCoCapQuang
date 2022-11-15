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
import {colors, icons, images} from '../../../Constants';
import CustomTextInput from '../../../Components/CustomTextInput';
import CustomButton from '../../../Components/CustomButton';
import {addCardRequirements} from '../../../Stores/slices/cardSlice';
const OrdersScreen = props => {
  const imageWidth = Dimensions.get('window').width - 20;
  const cardRequirements = useSelector(state => state?.card?.cardRequirements);
  const frontCardStore = useSelector(state => state?.card?.frontCard);
  const backOfCardStore = useSelector(state => state?.card?.backOfCard);
  const shareCardStore = useSelector(state => state?.card?.shareCard);
  const typeCardStore = useSelector(state => state?.card?.typeCard);
  const [nameproduct, setNameproduct] = useState('');
  const [frontCard, setFrontCard] = useState(null);
  const backOfCard =
    Platform.OS === 'ios' ? backOfCardStore?.path : backOfCardStore?.uri;
  useEffect(() => {
    shareCardStore?.contentUri
      ? setFrontCard(shareCardStore?.contentUri)
      : setFrontCard(
          Platform.OS === 'ios' ? frontCardStore?.path : frontCardStore?.uri,
        );
  }, []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log(cardRequirements);
  return (
    <View style={styles.container}>
      <CustomAppbar
        styleAppBar={{paddingHorizontal: 8, marginBottom: 10}}
        iconLeft={icons.ic_back}
        iconRight2={icons.ic_bell}
        iconRight1={icons.ic_shopping}
        title={'Order'}
        onPressLeftIcon={() => navigation.goBack()}
      />
      <ScrollView style={styles.eachContainer}>
        <Text style={styles.title}>{typeCardStore}</Text>
        <Image
          source={{uri: frontCard}}
          style={{width: imageWidth, height: imageWidth / 1.8}}
        />
        <View style={styles.line} />
        <View style={styles.viewRow}>
          <Text style={[styles.title, {width: '30%'}]}>제품 이름</Text>
          <CustomTextInput
            styleViewInput={styles.styleViewInput}
            placeholder={'Name product'}
            onChangeText={text => setNameproduct(text)}
            value={nameproduct}
          />
        </View>
        <View style={styles.viewRow}>
          <Text style={[styles.title, {width: '30%'}]}>종이의 종류</Text>
          <Text style={[styles.content, {width: '70%'}]}>
            {cardRequirements?.paper}
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={[styles.title, {width: '30%'}]}>사이즈</Text>
          <Text style={[styles.content, {width: '70%'}]}>
            {cardRequirements?.size}
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={[styles.title, {width: '30%'}]}>라운딩</Text>
          <Text style={[styles.content, {width: '70%'}]}>
            {cardRequirements?.rounding ? 'Yes' : 'No'}
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={[styles.title, {width: '30%'}]}>금액</Text>
          <Text style={[styles.textPrice, {width: '70%'}]}>
            {`${cardRequirements?.price} Won`}
          </Text>
        </View>
        <View style={styles.viewNote}>
          <Text style={styles.titleNote}>Note</Text>
          <Text style={styles.contentNote}>
            Lorem ipsum is simple dummy text of the printing and typesetting
            industry. Lorem ipsum is simply dummytext of the printing
          </Text>
        </View>
      </ScrollView>
      <CustomButton
        title={'Order'}
        styleButton={styles.styleCustomButton}
        styleText={styles.styleTextButton}
        onPress={() => {
          if (nameproduct == '') {
            alert('Please enter the name product');
          } else {
            let requirement = {
              nameproduct: nameproduct,
              paper: '일반용지',
              size: '90mm*50mm',
              amount: cardRequirements?.amount,
              rounding: cardRequirements?.rounding,
              price: cardRequirements?.price,
            };
            dispatch(addCardRequirements(requirement));
            navigation.navigate('PaymentScreen');
          }
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(119,119,119,0.5)',
    marginVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  viewRow: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    alignItems: 'center',
  },
  styleViewInput: {
    height: 40,
    width: '70%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(119,119,119,0.5)',
  },
  content: {
    fontSize: 16,
    color: 'grey',
  },
  textPrice: {
    fontSize: 20,
    color: colors.backgroundButtonRed,
    fontWeight: 'bold',
  },
  viewNote: {
    width: '100%',
    backgroundColor: 'rgb(242,242,242)',
    padding: 10,
  },
  titleNote: {
    fontSize: 18,
    color: 'grey',
  },
  contentNote: {
    fontSize: 14,
    color: 'black',
  },
  styleCustomButton: {
    height: 50,
    backgroundColor: colors.backgroundButtonRed,
  },
  styleTextButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default OrdersScreen;
