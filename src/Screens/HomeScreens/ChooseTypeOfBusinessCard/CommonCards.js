import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import CustomPicker from '../../../Components/CustomPicker';
import {colors, icons, images} from '../../../Constants';
import CustomTwoBottomButtonFuntion from '../../../Components/CustomTwoBottomButtonFuntion';
import {useDispatch} from 'react-redux';
import {addCardRequirements} from '../../../Stores/slices/cardSlice';

const AMOUNT = Array.from(new Array(200)).map((_, index) => ({
  label: index + 1,
  value: index + 1,
}));
const CommonCards = props => {
  const [rounding, setRounding] = useState(false);
  const [amount, setAmount] = useState(200);
  const [price, setPrice] = useState(0);
  const [isChoosingAmount, setIsChoosingAmount] = useState(false);
  const navigation = useNavigation();
  const widthImage = Dimensions.get('window').width - 20;
  const dispatch = useDispatch();
  useEffect(() => {
    setPrice(amount * 2000);
  }, [amount]);
  const onChangeAmount = newAmount => {
    return () => {
      setAmount(newAmount);
      setIsChoosingAmount(false);
    };
  };
  const onToggleChoosingSize = newStatus => {
    setIsChoosingAmount(prevValue => newStatus ?? !prevValue);
  };
  return (
    <View style={styles.container}>
      <CustomPicker
        onPress={onChangeAmount}
        open={isChoosingAmount}
        data={AMOUNT}
      />
      <Image
        source={images.im_commonCard}
        resizeMode="cover"
        style={{
          borderRadius: rounding ? 20 : 0,
          width: widthImage,
          height: widthImage / 1.8,
        }}
      />
      <ScrollView style={{flex: 1}}>
        <Text style={styles.titleContent}>
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry
        </Text>
        <View style={[styles.line, {width: widthImage}]} />
        <View style={styles.viewText}>
          <Text style={styles.titleText}>용지</Text>
          <Text style={styles.detailText}>일반용지</Text>
        </View>
        <View style={styles.viewText}>
          <Text style={styles.titleText}>사이즈</Text>
          <Text style={styles.detailText}>90mm*50mm</Text>
        </View>
        <View style={styles.viewText}>
          <Text style={styles.titleText}>수량</Text>
          <View style={{width: '70%'}}>
            <View style={{width: 150, height: 30}}>
              <TouchableOpacity
                onPress={onToggleChoosingSize}
                style={styles.choosingAmount}>
                <Text style={{color: 'black'}}>{amount}</Text>
                <Image
                  style={{width: 20, height: 20}}
                  source={icons.ic_sortDown}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.viewText}>
          <Text style={styles.titleText}>라운딩</Text>
          <View
            style={{
              width: '70%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() =>
                setRounding(prev => (prev == false ? true : false))
              }>
              {rounding ? (
                <Image style={styles.imageCheck} source={icons.check_box} />
              ) : (
                <Image
                  style={styles.imageCheck}
                  source={icons.check_box_empty}
                />
              )}
            </TouchableOpacity>
            <Text style={{color: 'rgb(146,146,146)', fontSize: 16}}>
              네귀도리
            </Text>
          </View>
        </View>
        <View style={[styles.line, {width: widthImage}]} />
        <View style={styles.viewText}>
          <Text style={styles.titlePrice}>금액</Text>
          <Text style={styles.detailPrice}>{price} 원</Text>
        </View>
      </ScrollView>
      <CustomTwoBottomButtonFuntion
        styleTwoButton={styles.customTwoBottomButtonFuntion}
        titleLeft={'이전'}
        titleRight={'다음단계'}
        styleTextLeft={{color: 'white'}}
        styleTextRight={{color: 'white'}}
        styleButtonLeft={{backgroundColor: colors.backgroundButtonRed}}
        styleButtonRight={{backgroundColor: colors.backgroundButton}}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => {
          let cardRequirements = {
            paper: '일반용지',
            size: '90mm*50mm',
            amount: amount,
            rounding: rounding,
            price: price,
          };
          navigation.navigate('ViewManuscript');
          dispatch(addCardRequirements(cardRequirements));
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
    alignItems: 'center',
  },

  image: {width: 300, height: 300 / 1.8},
  describe: {
    textAlign: 'center',
    fontWeight: '500',
    color: 'rgb(26,109,255)',
  },
  viewText: {
    flexDirection: 'row',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  titleText: {
    width: '30%',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'rgb(110,110,110)',
  },
  detailText: {
    width: '70%',
    color: 'rgb(146,146,146)',
    fontSize: 16,
  },
  choosingAmount: {
    height: 40,
    borderWidth: 1,
    borderColor: 'rgb(112,112,112)',
    borderRadius: 5,
    width: 150,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  titlePrice: {
    width: '30%',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  detailPrice: {
    width: '70%',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'red',
  },
  customTwoBottomButtonFuntion: {
    height: 60,
  },
  line: {
    height: 1,
    backgroundColor: 'rgba(119,119,119,0.4)',
    alignSelf: 'center',
  },
  titleContent: {
    fontSize: 14,
    fontWeight: '500',
    color: 'grey',
    marginVertical: 10,
    alignSelf: 'center',
  },
  imageCheck: {
    width: 20,
    height: 20,
    marginRight: 5,
    tintColor: 'grey',
  },
});
export default CommonCards;
