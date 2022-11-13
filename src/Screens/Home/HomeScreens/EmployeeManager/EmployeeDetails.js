import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomAppBar from '../../../../Components/CustomAppBar';
import CustomTextButton from '../../../../Components/CustomTextButton';
import CustomTextInputChangeValue from '../../../../Components/CustomTextInputChangeValue';
import {colors, icons} from '../../../../Constants';
import UsersAPI from '../../../../Api/Home/UsersAPI/UsersAPI';
import {useSelector} from 'react-redux';
import CustomModalPicker from '../../../../Components/CustomModalPicker';
import CustomConfirm from '../../../../Components/CustomConfirm';
import CustomLoading from '../../../../Components/CustomLoading';
const DATA_PICKER = [
  {key: 'Quản lý chung', value: 'GENERAL_MANAGER'},
  {key: 'Quản lý khu vực', value: 'AREA_MANAGER'},
  {key: 'Nhân viên', value: 'EMPLOYEE'},
];
const EmployeeDetails = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const [result, setResult] = useState(null);
  const token = useSelector(state => state?.token?.token);
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  const [editable, setEditable] = useState(false);
  const [modalRole, setModalRole] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getResult();
  }, []);
  const getResult = async () => {
    await UsersAPI.GetUsersByIdAPI(token, route.params)
      .then(res => {
        setResult(res?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isActive, setisActive] = useState(null);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [avatarImg, setAvatarImg] = useState('');
  const [role, setRole] = useState('');
  const [areaId, setAreaId] = useState(0);
  const [password, setPassword] = useState('');

  useEffect(() => {
    setAddress(result?.address);
    setAreaId(result?.area_id);
    setEmail(result?.email);
    setFullName(result?.full_name);
    setPhoneNumber(result?.phone_number);
    setRole(result?.role);
    setUsername(result?.username);
  }, [result]);
  const chooseRole = item => {
    setModalUserAssigned(false);
    setUserAssignedId(item);
  };
  const updateUserInfor = async () => {
    setLoading(true);
    let id = result?.id;
    let data = {
      email: email,
      username: username,
      is_active: isActive,
      full_name: fullName,
      phone_number: phoneNumber,
      address: address,
      avatar_img: 'string',
      role: role,
      area_id: areaId,
      password: password,
    };
    await UsersAPI.UpdateUsersByIdAPI(token, data, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          Alert.alert('Cập nhật thông tin', 'Cập nhật thành công');
          navigation.navigate('EmployeeManager');
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Cập nhật thông tin', 'Cập nhật thất bại');
        setLoading(false);
      });
  };
  if (loading) {
    return <CustomLoading />;
  }
  return (
    <View style={styles.container}>
      {modalRole && (
        <View style={styles.styleModal}>
          <CustomModalPicker
            data={DATA_PICKER}
            modalVisible={modalRole}
            onRequestClose={() => {
              setModalRole(false);
            }}
            onPress={item => chooseRole(item)}
            onPressChoose={item => {
              setModalRole(false);
              setRole(item?.value);
            }}
          />
        </View>
      )}
      {confirm && (
        <View style={styles.viewModal}>
          <CustomConfirm
            title={'Chỉnh sửa'}
            content={'Bạn có muốn chỉnh sửa thông tin ?'}
            leftLabel={'Trở lại'}
            rightLabel={'Chỉnh sửa'}
            leftPress={() => setConfirm(false)}
            rightPress={() => {
              setEditable(true);
              setConfirm(false);
            }}
          />
        </View>
      )}
      <CustomAppBar
        title={'Chi tiết thông tin NV'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
        iconRight={userInfor?.role != 'EMPLOYEE' ? icons.ic_pencil : null}
        onPressIconsRight={() => setConfirm(true)}
      />
      <ScrollView style={styles.eachContainer}>
        <View style={styles.viewAvatar}>
          <Image
            source={
              result?.avatar_img
                ? {
                    uri: `${result?.avatar_img}`,
                  }
                : icons.ic_user
            }
            style={styles.avatarEmployee}
          />
        </View>
        <CustomTextInputChangeValue
          styleViewInput={[
            styles.styleViewInputChange,
            {backgroundColor: editable ? 'white' : colors.background},
          ]}
          title={'Email : '}
          styleTitle={styles.styleTitleInput}
          editable={editable}
          styleInput={styles.styleValueInput}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[
            styles.styleViewInputChange,
            {backgroundColor: editable ? 'white' : colors.background},
          ]}
          title={'Nick name : '}
          styleTitle={styles.styleTitleInput}
          editable={editable}
          styleInput={styles.styleValueInput}
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[
            styles.styleViewInputChange,
            {backgroundColor: editable ? 'white' : colors.background},
          ]}
          title={'Tên : '}
          styleTitle={styles.styleTitleInput}
          editable={editable}
          styleInput={styles.styleValueInput}
          value={fullName}
          onChangeText={text => setFullName(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[
            styles.styleViewInputChange,
            {backgroundColor: editable ? 'white' : colors.background},
          ]}
          title={'SĐT : '}
          styleTitle={styles.styleTitleInput}
          editable={editable}
          styleInput={styles.styleValueInput}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[
            styles.styleViewInputChange,
            {backgroundColor: editable ? 'white' : colors.background},
          ]}
          title={'Địa chỉ : '}
          styleTitle={styles.styleTitleInput}
          editable={editable}
          styleInput={styles.styleValueInput}
          value={address}
          onChangeText={text => setAddress(text)}
        />

        <CustomTextInputChangeValue
          styleViewInput={[
            styles.styleViewInputChange,
            {backgroundColor: editable ? 'white' : colors.background},
          ]}
          title={'Area ID : '}
          styleTitle={styles.styleTitleInput}
          editable={editable}
          styleInput={styles.styleValueInput}
          value={areaId}
          onChangeText={text => setAreaId(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[
            styles.styleViewInputChange,
            {backgroundColor: editable ? 'white' : colors.background},
          ]}
          title={'Mật khẩu đăng nhập : '}
          styleTitle={styles.styleTitleInput}
          editable={editable}
          styleInput={styles.styleValueInput}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        {!modalRole ? (
          <ButtonPicker
            disabled={editable ? false : true}
            repeatBy={role}
            onPressPicker={() => setModalRole(true)}
          />
        ) : (
          <View style={[styles.styleViewInputChange]}>
            <Text style={styles.styleTitleInput}>Chức vụ : </Text>
            <Text style={styles.styleValueInput}>{role}</Text>
          </View>
        )}
        {editable && (
          <CustomTextButton
            styleButton={styles.styleButton}
            textStyle={styles.textStyle}
            label={'Lưu thông tin'}
            onPress={updateUserInfor}
          />
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  eachContainer: {flex: 1, paddingHorizontal: 10},
  avatarEmployee: {height: 200, width: 200, borderRadius: 200},
  viewAvatar: {width: '100%', alignItems: 'center', marginVertical: 20},
  styleViewInputChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  styleTitleInput: {
    fontSize: 16,
    color: colors.grey,
    fontWeight: 'normal',
    width: '30%',
  },
  styleValueInput: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    width: '70%',
  },
  styleModal: {
    backgroundColor: 'rgba(119,119,119,0.7)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  buttonPicker: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 5,
  },
  viewModal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(119,119,119,0.5)',
    position: 'absolute',
    zIndex: 9999,
  },
  styleButton: {
    height: 50,
    width: 150,
    backgroundColor: colors.mainColor,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
const ButtonPicker = props => {
  const {repeatBy, onPressPicker, disabled} = props;
  return (
    <View>
      <TouchableOpacity
        disabled={disabled}
        style={[styles.styleViewInputChange, styles.buttonPicker]}
        onPress={onPressPicker}>
        <Text style={styles.styleTitleInput}>Chức vụ : </Text>
        <Text style={styles.styleValueInput}>
          {repeatBy == 'EMPLOYEE'
            ? 'Nhân viên'
            : repeatBy == 'AREA_MANAGER'
            ? 'Quản lý khu vực'
            : repeatBy == 'GENERAL_MANAGER'
            ? 'Quản lý chung'
            : null}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default EmployeeDetails;
