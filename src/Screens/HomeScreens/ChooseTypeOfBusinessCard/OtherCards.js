import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
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
import ChooseOption from '../../../Components/ChooseOption';
import CustomTwoBottomButtonFuntion from '../../../Components/CustomTwoBottomButtonFuntion';

const AMOUNT = Array.from(new Array(200)).map((_, index) => ({
  label: index + 1,
  value: index + 1,
}));
const OtherCards = props => {
  const widthImage = Dimensions.get('window').width - 20;
  const [rounding, setRounding] = useState(false);
  const [amount, setAmount] = useState(200);
  const [paperType, setPaperType] = useState('반누보화이트');
  const [numberOfPrints, setNumberOfPrints] = useState('양면칼라');
  const [textSize, setTextSize] = useState('90mm*50mm');
  const [editDesignt, setEditDesignt] = useState(false);

  const [oshi, setOshi] = useState(false);
  const [sewingMachine, setSewingMachine] = useState(false);
  const [gourd, setGourd] = useState(false);

  const [press, setPress] = useState(false);
  const [numbering, setNumbering] = useState(false);
  const [allOver, setAllOver] = useState(false);

  const [perforation, setPerforation] = useState(false);
  const [earring, setEarring] = useState(false);
  const [epoxy, setEpoxy] = useState(false);

  const [isChoosingAmount, setIsChoosingAmount] = useState(false);
  const navigation = useNavigation();
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
        source={images.im_otherCard}
        resizeMode="cover"
        style={{
          borderRadius: 20,
          // borderRadius: rounding ? 20 : 0,
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
          <View style={{width: '65%'}}>
            <View style={{width: 150, height: 30}}>
              <TouchableOpacity
                onPress={onToggleChoosingSize}
                style={styles.choosingAmount}>
                <Text style={{color: 'black'}}>{paperType}</Text>
                <Image
                  style={{width: 20, height: 20}}
                  source={icons.ic_sortDown}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.viewText}>
          <Text style={styles.titleText}>인쇄도수</Text>
          <View style={{width: '65%'}}>
            <View style={{width: 150, height: 30}}>
              <TouchableOpacity
                onPress={onToggleChoosingSize}
                style={styles.choosingAmount}>
                <Text style={{color: 'black'}}>{numberOfPrints}</Text>
                <Image
                  style={{width: 20, height: 20}}
                  source={icons.ic_sortDown}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.viewText}>
          <Text style={styles.titleText}>사이즈</Text>
          <View style={{width: '65%'}}>
            <View style={{width: 150, height: 30}}>
              <TouchableOpacity
                onPress={onToggleChoosingSize}
                style={styles.choosingAmount}>
                <Text style={{color: 'black'}}>{textSize}</Text>
                <Image
                  style={{width: 20, height: 20}}
                  source={icons.ic_sortDown}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.viewText}>
          <Text style={styles.titleText}>수량</Text>
          <View style={{width: '65%'}}>
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
          <Text style={styles.titleText}>디자인편집</Text>
          <View
            style={{
              width: '65%',
              flexDirection: 'row',
            }}>
            <ChooseOption
              style={{marginRight: 20}}
              isCheck={!editDesignt}
              label={'무'}
              onPress={() => setEditDesignt(false)}
            />
            <ChooseOption
              isCheck={editDesignt}
              label={'유'}
              onPress={() => setEditDesignt(true)}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
          }}>
          <Text style={styles.postProcessing}>후가공</Text>
          <View
            style={{
              width: '65%',
              height: '100%',
              marginTop: 10,
            }}>
            <View style={styles.viewChooseOption}>
              <ChooseOption
                label={'오시'}
                isCheck={oshi}
                onPress={() => setOshi(prev => (prev == false ? true : false))}
              />
              <ChooseOption
                label={'미싱'}
                isCheck={sewingMachine}
                onPress={() =>
                  setSewingMachine(prev => (prev == false ? true : false))
                }
              />
              <ChooseOption
                label={'박'}
                isCheck={gourd}
                onPress={() => setGourd(prev => (prev == false ? true : false))}
              />
            </View>
            <View style={styles.viewChooseOption}>
              <ChooseOption
                label={'형압'}
                isCheck={press}
                onPress={() => setPress(prev => (prev == false ? true : false))}
              />
              <ChooseOption
                label={'넘버링'}
                isCheck={numbering}
                onPress={() =>
                  setNumbering(prev => (prev == false ? true : false))
                }
              />
              <ChooseOption
                label={'도무송'}
                isCheck={allOver}
                onPress={() =>
                  setAllOver(prev => (prev == false ? true : false))
                }
              />
            </View>
            <View style={styles.viewChooseOption}>
              <ChooseOption
                label={'타공'}
                isCheck={perforation}
                onPress={() =>
                  setPerforation(prev => (prev == false ? true : false))
                }
              />
              <ChooseOption
                label={'귀도리'}
                isCheck={earring}
                onPress={() =>
                  setEarring(prev => (prev == false ? true : false))
                }
              />
              <ChooseOption
                label={'에폭시'}
                isCheck={epoxy}
                onPress={() => setEpoxy(prev => (prev == false ? true : false))}
              />
            </View>
          </View>
        </View>
        {}
        <View style={[styles.line, {width: widthImage}]} />
        <View style={styles.viewText}>
          <Text style={styles.titlePrice}>금액</Text>
          <Text style={styles.detailPrice}>{amount * 20000} 원</Text>
        </View>
      </ScrollView>
      <CustomTwoBottomButtonFuntion
        styleTwoButton={styles.customTwoBottomButtonFuntion}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => navigation.navigate('ViewManuscript')}
        titleLeft={'이전'}
        titleRight={'다음단계'}
        styleTextLeft={{color: 'white'}}
        styleTextRight={{color: 'white'}}
        styleButtonLeft={{backgroundColor: 'rgb(251,132,124)'}}
        styleButtonRight={{backgroundColor: colors.backgroundButton}}
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
  titleContent: {
    fontSize: 14,
    fontWeight: '500',
    color: 'grey',
    marginVertical: 10,
    alignSelf: 'center',
  },
  line: {
    height: 1,
    backgroundColor: 'rgba(119,119,119,0.4)',
    alignSelf: 'center',
  },
  customTwoBottomButtonFuntion: {
    height: 60,
  },
  button: {
    width: 320,
    height: 180,
    alignSelf: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(218,227,243)',
  },
  image: {width: 320, height: 180, position: 'absolute'},
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
    width: 200,
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
  postProcessing: {
    width: '30%',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'rgb(110,110,110)',
    textAlign: 'center',
  },
  viewChooseOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
export default OtherCards;
