import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
  Keyboard,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {colors, icons, images} from '../../../../../../Constants';
import CustomAppBar from '../../../../../../Components/CustomAppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomTextButton from '../../../../../../Components/CustomTextButton';
import CustomTextInputChangeValue from '../../../../../../Components/CustomTextInputChangeValue';
import CusttomTwoButtonBottom from '../../../../../../Components/CusttomTwoButtonBottom';
import {useSelector} from 'react-redux';
import CustomConfirm from '../../../../../../Components/CustomConfirm';
import {CreateSuppliesAPI} from '../../../../../../Api/Home/StableWarehouseAPI/StableWarehouseAPI';
const CreateSupplies = props => {
  const navigation = useNavigation();
  const token = useSelector(state => state?.token?.token);
  const isOk = () =>
    name.length > 0 &&
    code.length > 0 &&
    category.length > 0 &&
    manufacturer.length > 0 &&
    ownerFacility.length > 0 &&
    unit.length > 0 &&
    description.length > 0 &&
    minimumQuantity.length > 0;

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [ownerFacility, setOwnerFacility] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [minimumQuantity, setMinimumQuantity] = useState('');

  const createSupplies = async () => {
    let data = {
      name: name,
      code: code,
      category: category,
      manufacturer: manufacturer,
      owner_facility: ownerFacility,
      unit: unit,
      description: description,
      minimum_quantity: parseFloat(minimumQuantity) ?? 0,
    };
    await CreateSuppliesAPI(token, data)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          Alert.alert('T???o v???t t??', 'T???o v???t t?? th??nh c??ng');
          navigation.navigate('ListSupplies');
        } else if (res?.status == 200 && res?.data?.success == false) {
          Alert.alert('T???o v???t t??', 'Kh??ng th??? t???o v???t t??');
        }
      })
      .catch(function (error) {
        Alert.alert('T???o v???t t??', 'T???o v???t t?? th???t b???i');
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'T???o v???t t??'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'T??n v???t t?? : '}
          placeholder={'Nh???p t??n v???t t??'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={name}
          onChangeText={text => setName(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'M?? v???t t?? : '}
          placeholder={'Nh???p m?? v???t t??'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={code}
          onChangeText={text => setCode(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Th??? lo???i v???t t?? : '}
          placeholder={'Nh???p th??? lo???i v???t t??'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={category}
          onChangeText={text => setCategory(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Ch??? c?? s??? : '}
          placeholder={'Nh???p ch??? c?? s???'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={ownerFacility}
          onChangeText={text => setOwnerFacility(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Nh?? s???n xu???t : '}
          placeholder={'Nh???p nh?? s???n xu???t'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={manufacturer}
          onChangeText={text => setManufacturer(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'????n v??? (VD:M??t...) : '}
          placeholder={'Nh???p ????n v???'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={unit}
          onChangeText={text => setUnit(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'M?? t??? : '}
          placeholder={'Nh???p m?? t???'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <CustomTextInputChangeValue
          keyboardType={'numeric'}
          styleViewInput={[styles.styleViewInputChange]}
          title={'S??? l?????ng t???i thi???u : '}
          placeholder={'Nh???p s??? l?????ng t???i thi???u'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={minimumQuantity}
          onChangeText={text => setMinimumQuantity(text)}
        />
        <CustomTextButton
          styleButton={[
            styles.styleCustomTextButton,
            {
              backgroundColor: isOk() ? colors.mainColor : 'grey',
            },
          ]}
          textStyle={styles.styleTextCustomTextButton}
          label={'T???o v???t t??'}
          onPress={() => createSupplies()}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  styleViewInputChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  styleTitleInput: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    width: '30%',
  },
  styleValueInput: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'normal',
    width: '70%',
  },
  styleCustomTextButton: {
    height: 50,
    width: 150,
    marginVertical: 15,
    alignSelf: 'center',
    borderRadius: 10,
  },
  styleTextCustomTextButton: {fontSize: 18, fontWeight: 'bold', color: 'white'},
});

export default CreateSupplies;
