import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors, icons} from '../../../Constants';
import CommonCards from './CommonCards';
import OtherCards from './OtherCards';
import CustomAppbar from '../../../Components/CustomAppBar';
import CustomTwoButtonFuntion from '../../../Components/CustomTwoButtonFuntion';
import {useDispatch, useSelector} from 'react-redux';
import {addCard, addtypeCard} from '../../../Stores/slices/cardSlice';
const TypeOfBusinessCard = props => {
  const navigation = useNavigation();
  const [typeOfCard, setTypeOfCard] = useState(null);
  const typeCard = useSelector(state => state?.card?.typeCard);
  const dispatch = useDispatch();
  useEffect(() => {
    setTypeOfCard(typeCard);
  }, []);

  return (
    <View style={styles.container}>
      <CustomAppbar
        styleAppBar={{paddingHorizontal: 8}}
        iconLeft={icons.ic_back}
        iconRight2={icons.ic_bell}
        iconRight1={icons.ic_shopping}
        title={'주문할 명함 유형을 선택하세요'}
        onPressLeftIcon={() => navigation.goBack()}
      />
      <CustomTwoButtonFuntion
        titleLeft={'일반형'}
        titleRight={'기타'}
        styleTextLeft={{color: typeOfCard == 'common' ? 'white' : 'grey'}}
        styleTextRight={{color: typeOfCard == 'other' ? 'white' : 'grey'}}
        styleTwoButton={styles.customTwoButtonFuntion}
        styleButtonLeft={[
          styles.leftButtonTop,
          {
            backgroundColor:
              typeOfCard == 'common'
                ? colors.backgroundButton
                : colors.backgroundInput,
          },
        ]}
        styleButtonRight={[
          styles.rightButtonTop,
          {
            backgroundColor:
              typeOfCard == 'other'
                ? colors.backgroundButton
                : colors.backgroundInput,
          },
        ]}
        onPressLeft={() => {
          dispatch(addtypeCard('common'));
          setTypeOfCard('common');
        }}
        onPressRight={() => {
          dispatch(addtypeCard('other'));
          setTypeOfCard('other');
        }}
      />
      {typeOfCard == 'common' ? <CommonCards /> : <OtherCards />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
  customTwoButtonFuntion: {
    height: 40,
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 20,
  },
  leftButtonTop: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightButtonTop: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});
export default TypeOfBusinessCard;
