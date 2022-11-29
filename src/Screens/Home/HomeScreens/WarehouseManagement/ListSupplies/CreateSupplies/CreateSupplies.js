import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View, ScrollView} from 'react-native';
import {colors, icons, images} from '../../../../../../Constants';
import CustomAppBar from '../../../../../../Components/CustomAppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomTextButton from '../../../../../../Components/CustomTextButton';
import CustomTextInputChangeValue from '../../../../../../Components/CustomTextInputChangeValue';
import {useSelector} from 'react-redux';
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
          Alert.alert('Tạo vật tư', 'Tạo vật tư thành công');
          navigation.navigate('ListSupplies');
        } else if (res?.status == 200 && res?.data?.success == false) {
          Alert.alert('Tạo vật tư', 'Không thể tạo vật tư');
        }
      })
      .catch(function (error) {
        Alert.alert('Tạo vật tư', 'Tạo vật tư thất bại');
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Tạo vật tư'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Tên vật tư : '}
          placeholder={'Nhập tên vật tư'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={name}
          onChangeText={text => setName(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Mã vật tư : '}
          placeholder={'Nhập mã vật tư'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={code}
          onChangeText={text => setCode(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Thể loại vật tư : '}
          placeholder={'Nhập thể loại vật tư'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={category}
          onChangeText={text => setCategory(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Chủ cơ sở : '}
          placeholder={'Nhập chủ cơ sở'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={ownerFacility}
          onChangeText={text => setOwnerFacility(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Nhà sản xuất : '}
          placeholder={'Nhập nhà sản xuất'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={manufacturer}
          onChangeText={text => setManufacturer(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Đơn vị (VD:Mét...) : '}
          placeholder={'Nhập đơn vị'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={unit}
          onChangeText={text => setUnit(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Mô tả : '}
          placeholder={'Nhập mô tả'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <CustomTextInputChangeValue
          keyboardType={'numeric'}
          styleViewInput={[styles.styleViewInputChange]}
          title={'Số lượng tối thiểu : '}
          placeholder={'Nhập số lượng tối thiểu'}
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
          label={'Tạo vật tư'}
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
