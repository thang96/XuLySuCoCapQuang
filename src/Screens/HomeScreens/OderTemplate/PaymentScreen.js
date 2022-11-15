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
import {useSelector} from 'react-redux';
import ChooseOption from '../../../Components/ChooseOption';
import CustomAppbar from '../../../Components/CustomAppBar';
import CustomButton from '../../../Components/CustomButton';
import CustomTextInput from '../../../Components/CustomTextInput';
import {colors, icons} from '../../../Constants';
const PaymentScreen = props => {
  const cardRequirements = useSelector(state => state?.card?.cardRequirements);
  const frontCardStore = useSelector(state => state?.card?.frontCard);
  const backOfCardStore = useSelector(state => state?.card?.backOfCard);
  const shareCardStore = useSelector(state => state?.card?.shareCard);
  const typeCardStore = useSelector(state => state?.card?.typeCard);
  const [username, setUsername] = useState('');
  const [numberphone, setNumberphone] = useState('');
  const navigation = useNavigation();
  const [date, setDate] = useState(null);
  useEffect(() => {
    let today = new Date();
    let date = `${today.getFullYear()}년${
      today.getMonth() + 1
    }월${today.getDate()}일'`;
    setDate(date);
  }, []);
  console.log(date);
  return (
    <View style={styles.container}>
      <CustomAppbar
        styleAppBar={{paddingHorizontal: 8, marginBottom: 10}}
        iconLeft={icons.ic_back}
        iconRight2={icons.ic_bell}
        iconRight1={icons.ic_shopping}
        title={'Payment'}
        onPressLeftIcon={() => navigation.goBack()}
      />
      <ScrollView style={styles.eachContainer}>
        <Text style={[styles.title, {marginVertical: 10}]}>
          Oedering information
        </Text>
        <View style={styles.viewRow}>
          <Text style={[styles.title, {width: '30%'}]}>이름</Text>
          <CustomTextInput
            styleViewInput={styles.styleViewInput}
            placeholder={'Name product'}
            onChangeText={text => setUsername(text)}
            value={username}
          />
        </View>
        <View style={styles.viewRow}>
          <Text style={[styles.title, {width: '30%'}]}>전화 번호</Text>
          <CustomTextInput
            styleViewInput={styles.styleViewInput}
            placeholder={'Numberphone'}
            onChangeText={text => setNumberphone(text)}
            value={numberphone}
          />
        </View>
        <View style={styles.line} />
        <Text style={[styles.titleNormal, {marginVertical: 10}]}>
          배달 주소
        </Text>
        <View style={styles.viewRow}>
          <ChooseOption
            isCheck={false}
            style={{marginRight: 5}}
            onPress={() => {}}
          />
          <Text style={styles.contentNormal}>
            Synchronize with orderer information
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={[styles.title, {width: '30%'}]}>이름</Text>
          <CustomTextInput
            styleViewInput={styles.styleViewInput}
            placeholder={'Name product'}
            onChangeText={text => setUsername(text)}
            value={username}
          />
        </View>
        <View style={styles.viewRow}>
          <Text style={[styles.title, {width: '30%'}]}>전화 번호</Text>
          <CustomTextInput
            styleViewInput={styles.styleViewInput}
            placeholder={'Numberphone'}
            onChangeText={text => setNumberphone(text)}
            value={numberphone}
          />
        </View>
        <View style={[styles.viewRow, {justifyContent: 'space-between'}]}>
          <Text style={[styles.title, {marginVertical: 10}]}>ADDRESS</Text>
          <CustomButton
            title={'Seach in map'}
            styleText={{color: colors.backgroundButtonGreen}}
          />
        </View>
        <CustomTextInput
          styleViewInput={styles.styleCustomTextInput}
          placeholder={''}
          onChangeText={text => setNumberphone(text)}
          value={numberphone}
        />
        <CustomTextInput
          styleViewInput={styles.styleCustomTextInput}
          placeholder={''}
          onChangeText={text => setNumberphone(text)}
          value={numberphone}
        />
        <View style={styles.line} />
        <Text style={styles.titleNormal}>배송 방법 </Text>
        <View style={[{justifyContent: 'space-between'}, styles.viewRow]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ChooseOption
              isCheck={false}
              style={{marginRight: 5}}
              onPress={() => {}}
            />
            <Text style={styles.content}>배달</Text>
          </View>
          <Text style={[styles.textPrice, {color: 'red'}]}>15,000 Won</Text>
        </View>
        <View style={[{justifyContent: 'space-between'}, styles.viewRow]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ChooseOption
              isCheck={false}
              style={{marginRight: 5}}
              onPress={() => {}}
            />
            <Text style={styles.content}>Quick</Text>
          </View>
          <Text style={[styles.textPrice, {color: 'red'}]}>20,000 Won</Text>
        </View>
        <View style={[{justifyContent: 'space-between'}, styles.viewRow]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ChooseOption
              isCheck={false}
              style={{marginRight: 5}}
              onPress={() => {}}
            />
            <Text style={styles.content}>상품 받으러 오세요</Text>
          </View>
          <Text style={[styles.textPrice, {color: 'grey'}]}>Free</Text>
        </View>
        <View style={[{justifyContent: 'space-between'}, styles.viewRow]}>
          <Text style={[styles.content, {color: 'grey'}]}>재고 날짜</Text>
          <Text style={[styles.content, {color: 'grey'}]}>{'currentDate'}</Text>
        </View>
        <View style={styles.line} />
        <Text style={styles.titleNormal}>지불 방법</Text>
        <View style={styles.viewRow}>
          <ChooseOption style={{marginRight: 10}} isCheck={false} />
          <Text style={styles.content}>CREDIT</Text>
        </View>
        <View style={styles.viewRow}>
          <ChooseOption style={{marginRight: 10}} isCheck={false} />
          <Text style={styles.content}>VIRTUAL ACCOUNT</Text>
        </View>
        <View style={styles.viewRow}>
          <ChooseOption style={{marginRight: 10}} isCheck={false} />
          <Text style={styles.content}>REAL-TIME TRANSFER</Text>
        </View>
        <View style={styles.viewRow}>
          <ChooseOption style={{marginRight: 10}} isCheck={false} />
          <Text style={styles.content}>PAY</Text>
        </View>
        <View style={styles.viewOtherPay}>
          <Text style={styles.titleNormal}>Other</Text>
          <View style={styles.viewRow}>
            <ChooseOption style={{marginRight: 10}} isCheck={false} />
            <Text style={styles.content}>Add a simple payment card</Text>
          </View>
          <View style={styles.viewRow}>
            <ChooseOption style={{marginRight: 10}} isCheck={false} />
            <Text style={styles.content}>
              Save current selected payment method
            </Text>
          </View>
          <View style={styles.viewRow}>
            <ChooseOption style={{marginRight: 10}} isCheck={false} />
            <Text style={styles.content}>Request a tax invoice</Text>
          </View>
          <View style={styles.viewRow}>
            <ChooseOption style={{marginRight: 10}} isCheck={false} />
            <Text style={styles.content}>Ask for a cash bill</Text>
          </View>
        </View>
        <View style={styles.line} />
        <Text style={styles.title}>PAYMENT AMOUNT</Text>
        <View style={styles.viewRow}>
          <Text style={[styles.titleNormal, {width: '30%'}]}>물품 돈</Text>
          <Text style={[styles.titleNormal, {width: '70%'}]}>
            {'20000 Won'}
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={[styles.titleNormal, {width: '30%'}]}>교통비</Text>
          <Text style={[styles.titleNormal, {width: '70%'}]}>
            {'20000 Won'}
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={[styles.titleNormal, {width: '30%'}]}>세</Text>
          <Text style={[styles.titleNormal, {width: '70%'}]}>
            {'20000 Won'}
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={[styles.titleNormal, {width: '30%'}]}>Toal</Text>
          <Text style={[styles.titleNormal, {width: '70%', color: 'red'}]}>
            {'60000 Won'}
          </Text>
        </View>
      </ScrollView>
      <CustomButton
        title={'PAYMENT'}
        styleButton={styles.styleCustomButton}
        styleText={styles.styleTextButton}
        onPress={() => {}}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  eachContainer: {flex: 1, paddingHorizontal: 10},
  title: {fontSize: 18, fontWeight: 'bold', color: 'black'},
  viewRow: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    alignItems: 'center',
  },
  titleNormal: {fontSize: 18, fontWeight: 'bold', color: 'grey'},
  styleViewInput: {
    height: 40,
    width: '70%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(119,119,119,0.5)',
  },
  styleCustomTextInput: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(119,119,119,0.5)',
    marginBottom: 5,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(119,119,119,0.5)',
    marginVertical: 15,
  },
  content: {
    fontSize: 16,
    color: 'black',
  },
  contentNormal: {
    fontSize: 16,
    color: 'grey',
  },
  textPrice: {
    fontSize: 16,
    fontWeight: '500',
  },
  viewOtherPay: {
    backgroundColor: colors.backgroundInput,
    padding: 10,
    borderRadius: 10,
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
export default PaymentScreen;
