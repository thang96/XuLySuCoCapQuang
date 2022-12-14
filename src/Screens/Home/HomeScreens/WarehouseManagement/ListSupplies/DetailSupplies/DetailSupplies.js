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
import {
  GetSuppliesByIdAPI,
  UpdateSuppliesAPI,
} from '../../../../../../Api/Home/StableWarehouseAPI/StableWarehouseAPI';
import UsersAPI from '../../../../../../Api/Home/UsersAPI/UsersAPI';
const DetailSupplies = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = useSelector(state => state?.token?.token);
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);
  const [supplies, setsupplies] = useState([]);
  const [userCreate, setUserCreate] = useState([]);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [ownerFacility, setOwnerFacility] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [minimumQuantity, setMinimumQuantity] = useState('');
  useEffect(() => {
    getResult();
  }, []);

  const getResult = async () => {
    let id = route.params;
    await GetSuppliesByIdAPI(token, id)
      .then(res => {
        setsupplies(res?.data?.data);
        setLoading(false);
        getUserInfo(res?.data?.data?.created_user_id);
        setResult(res?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const setResult = async data => {
    setName(data?.name);
    setCode(data?.code);
    setCategory(data?.category);
    setManufacturer(data?.manufacturer);
    setOwnerFacility(data?.owner_facility);
    setUnit(data?.unit);
    setDescription(data?.description);
    setMinimumQuantity(data?.minimum_quantity);
  };
  const getUserInfo = async idUser => {
    await UsersAPI.GetUsersByIdAPI(token, idUser)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setUserCreate(res?.data?.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const updateSupplies = async () => {
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
    let id = supplies.id;
    await UpdateSuppliesAPI(token, data, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          Alert.alert('C???p nh???t v???t t??', 'C???p nh???t v???t t?? th??nh c??ng');
        } else if (res?.status == 200 && res?.data?.success == false) {
          Alert.alert('C???p nh???t v???t t??', 'Kh??ng th??? c???p nh???t v???t t??');
        }
      })
      .catch(function (error) {
        Alert.alert('C???p nh???t v???t t??', 'C???p nh???t v???t t?? th???t b???i');
        console.log(error);
      });
    setEditable(false);
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Chi ti???t v???t t??'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      {loading == false && userInfor?.role != 'EMPLOYEE' && (
        <CustomButtonUpdate
          isUpdate={editable}
          firtPress={() => setEditable(true)}
          secondPress={() => updateSupplies()}
        />
      )}
      {loading ? (
        <ActivityIndicator size="large" color={colors.mainColor} />
      ) : (
        <ScrollView style={styles.eachContainer}>
          <View style={styles.viewRow}>
            <Text style={styles.styleContent}>Chi ti???t v???t t?? :</Text>
            <CustomTextInputChangeValue
              styleViewInput={[
                styles.styleViewInputChange,
                {borderBottomWidth: editable ? 0.5 : 0},
              ]}
              title={'T??n v???t t?? : '}
              styleTitle={styles.styleTitleInput}
              editable={editable}
              styleInput={styles.styleValueInput}
              value={name}
              onChangeText={text => setName(text)}
            />
            <CustomTextInputChangeValue
              styleViewInput={[
                styles.styleViewInputChange,
                {borderBottomWidth: editable ? 0.5 : 0},
              ]}
              title={'M?? v???t t?? : '}
              styleTitle={styles.styleTitleInput}
              editable={editable}
              styleInput={styles.styleValueInput}
              value={code}
              onChangeText={text => setCode(text)}
            />
            <CustomTextInputChangeValue
              styleViewInput={[
                styles.styleViewInputChange,
                {borderBottomWidth: editable ? 0.5 : 0},
              ]}
              title={'Th??? lo???i v???t t?? : '}
              styleTitle={styles.styleTitleInput}
              editable={editable}
              styleInput={styles.styleValueInput}
              value={category}
              onChangeText={text => setCategory(text)}
            />
            <CustomTextInputChangeValue
              styleViewInput={[
                styles.styleViewInputChange,
                {borderBottomWidth: editable ? 0.5 : 0},
              ]}
              title={'Ch??? c?? s??? : '}
              styleTitle={styles.styleTitleInput}
              editable={editable}
              styleInput={styles.styleValueInput}
              value={ownerFacility}
              onChangeText={text => setOwnerFacility(text)}
            />
            <CustomTextInputChangeValue
              styleViewInput={[
                styles.styleViewInputChange,
                {borderBottomWidth: editable ? 0.5 : 0},
              ]}
              title={'Nh?? s???n xu???t : '}
              styleTitle={styles.styleTitleInput}
              editable={editable}
              styleInput={styles.styleValueInput}
              value={manufacturer}
              onChangeText={text => setManufacturer(text)}
            />
            <CustomTextInputChangeValue
              styleViewInput={[
                styles.styleViewInputChange,
                {borderBottomWidth: editable ? 0.5 : 0},
              ]}
              title={'????n v??? (VD:M??t...) : '}
              styleTitle={styles.styleTitleInput}
              editable={editable}
              styleInput={styles.styleValueInput}
              value={unit}
              onChangeText={text => setUnit(text)}
            />
            <CustomTextInputChangeValue
              styleViewInput={[
                styles.styleViewInputChange,
                {borderBottomWidth: editable ? 0.5 : 0},
              ]}
              title={'M?? t??? : '}
              styleTitle={styles.styleTitleInput}
              editable={editable}
              styleInput={styles.styleValueInput}
              value={description}
              onChangeText={text => setDescription(text)}
            />
            <CustomTextInputChangeValue
              keyboardType={'numeric'}
              styleViewInput={[
                styles.styleViewInputChange,
                {borderBottomWidth: editable ? 0.5 : 0},
              ]}
              title={'S??? l?????ng t???i thi???u : '}
              styleTitle={styles.styleTitleInput}
              editable={editable}
              styleInput={styles.styleValueInput}
              value={`${minimumQuantity}`}
              onChangeText={text => setMinimumQuantity(text)}
            />
            <CustomViewRow
              title={'Th???i gian t???o : '}
              content={supplies?.created_time}
            />
          </View>
          <View style={[styles.viewRow, {marginTop: 10}]}>
            <Text style={styles.styleContent}>Ng?????i t???o : </Text>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 80,
                alignSelf: 'center',
              }}
              source={
                userCreate?.avatar_img
                  ? {uri: userCreate?.avatar_img}
                  : icons.ic_user
              }
            />
            <CustomViewRow title={'T??n : '} content={userCreate?.full_name} />
            <CustomViewRow
              title={'S??T : '}
              content={userCreate?.phone_number}
            />
            <CustomViewRow title={'Email : '} content={userCreate?.email} />
            <CustomViewRow
              title={'Ch???c v??? : '}
              content={
                userCreate?.role == 'GENERAL_MANAGER'
                  ? 'Qu???n l?? chung'
                  : userCreate?.role == 'AREA_MANAGER'
                  ? 'Qu???n l?? khu v???c'
                  : userCreate?.role == 'EMPLOYEE'
                  ? 'Nh??n vi??n'
                  : null
              }
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  viewRow: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  styleTitle: {color: 'grey', fontSize: 18, fontWeight: 'bold', width: '30%'},
  styleContent: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    maxWidth: '65%',
  },
  styleViewInputChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  styleTitleInput: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    width: '25%',
  },
  styleValueInput: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    width: '70%',
  },
  buttonUpdate: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: colors.mainColor,
    width: 60,
    height: 60,
    borderRadius: 60,
    zIndex: 9999,
  },
  textUpdate: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
const CustomViewRow = props => {
  const {title, content} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 50,
      }}>
      <Text style={styles.styleTitle}>{title}</Text>
      <Text style={styles.styleContent}>{content}</Text>
    </View>
  );
};
const CustomButtonUpdate = props => {
  const {isUpdate, firtPress, secondPress} = props;
  return (
    <View style={styles.buttonUpdate}>
      {isUpdate ? (
        <CustomTextButton
          onPress={secondPress}
          label={'L??u'}
          textStyle={styles.textUpdate}
        />
      ) : (
        <CustomTextButton
          onPress={firtPress}
          label={'Update v???t t??'}
          textStyle={styles.textUpdate}
        />
      )}
    </View>
  );
};
export default DetailSupplies;
