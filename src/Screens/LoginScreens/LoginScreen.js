import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Image,
  Alert,
} from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import CustomButtonLogo from '../../Components/CustomButtonLogo';
import CustomLoading from '../../Components/CustomLoading';
import {icons, colors} from '../../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateUser} from '../../Stores/slices/useSlice';
import {updateToken} from '../../Stores/slices/tokenSlice';
import {useDispatch} from 'react-redux';
import loginApi from '../../Apis/LoginAPI/LoginApi';
import {useNavigation} from '@react-navigation/native';
import LoginAPI from '../../Apis/LoginAPI/LoginApi';
const LoginScreen = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [siteId, setSiteId] = useState('');
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isValidationOK = () => username.length > 0 && password.length > 5;

  const memberRegistration = async () => {};
  const todoLogin = async () => {
    const data = {username: username, password: password, site_id: siteId};
    setLoading(true);
    await LoginAPI.PostUserTokenAPI(data)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          let accessToken = res?.data?.data?.access_token;
          AsyncStorage.setItem('user', JSON.stringify(data));
          AsyncStorage.setItem('token', accessToken);
          dispatch(updateUser(data));
          dispatch(updateToken(accessToken));
          navigation.navigate('HomeNavigation');
          setLoading(false);
        } else {
          showAlert();
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        showAlert();
      });
  };
  const showAlert = () => Alert.alert('Login', 'Login error');
  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.viewModal}>
          <CustomLoading
            modalVisible={loading}
            onRequestClose={() => setLoading(false)}
          />
        </View>
      )}
      <ScrollView style={styles.eachContainer}>
        <View style={styles.viewRowTop}>
          <Text style={styles.title}>Login</Text>
          <Image source={icons.ic_twinkle} style={{width: 40, height: 40}} />
        </View>
        <Text style={styles.content}>Wellcome to Zziger</Text>
        <View style={{marginTop: 20}}>
          <CustomTextInput
            style={styles.customTextInput}
            image={icons.ic_user}
            placeholder={'Username'}
            styleViewInput={styles.customTextInput}
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <CustomTextInput
            imageRight={isShow ? icons.ic_hidden : icons.ic_show}
            style={styles.customTextInput}
            image={icons.ic_key}
            placeholder={'Password'}
            styleViewInput={styles.customTextInput}
            value={password}
            disabledRight={false}
            secureTextEntry={isShow}
            onPressRight={() =>
              setIsShow(prev => (prev == false ? true : false))
            }
            onChangeText={text => setPassword(text)}
          />
          <CustomTextInput
            style={styles.customTextInput}
            placeholder={'Site ID'}
            styleViewInput={styles.customTextInput}
            secureTextEntry={true}
            value={siteId}
            onChangeText={text => setSiteId(text)}
          />
          <CustomButton
            title={'Login'}
            styleButton={styles.customButton}
            styleText={styles.textButton}
            onPress={() => todoLogin()}
          />
        </View>
        <View style={styles.viewRow}>
          <CustomButton
            title={'Forgot password ?'}
            styleText={styles.text}
            onPress={() => {}}
          />
          <CustomButton
            title={'Find your ID'}
            styleText={styles.text}
            onPress={() => {}}
          />
        </View>
        <View style={styles.viewRow}>
          <View style={styles.viewLine} />
          <Text style={{marginHorizontal: 10, fontSize: 16}}>or</Text>
          <View style={styles.viewLine} />
        </View>
        <View style={styles.viewRow}>
          <CustomButtonLogo
            source={icons.ic_facebook}
            styleButton={styles.customButtonLogo}
          />
          <CustomButtonLogo
            source={icons.ic_naver}
            styleButton={styles.customButtonLogo}
          />
          <CustomButtonLogo
            source={icons.ic_kakaotalk}
            styleButton={styles.customButtonLogo}
          />
          <CustomButtonLogo
            source={icons.ic_google}
            styleButton={styles.customButtonLogo}
          />
        </View>
      </ScrollView>
      <CustomButton
        title={"Dont't you have an account ?"}
        styleButton={styles.buttonCreateAccount}
        styleText={styles.textCreateAccount}
        onPress={memberRegistration()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewModal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
    position: 'absolute',
  },
  eachContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  viewRowTop: {flexDirection: 'row', alignItems: 'center', marginTop: 60},
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'black',
  },
  content: {
    fontSize: 15,
    color: 'grey',
  },
  customTextInput: {
    height: 50,
    backgroundColor: colors.backgroundInput,
    marginBottom: 10,
    borderRadius: 5,
  },
  customButton: {
    backgroundColor: colors.backgroundButton,
    height: 50,
    borderRadius: 5,
  },
  textButton: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  viewRow: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: colors.backgroundButton,
  },
  viewLine: {height: 1, backgroundColor: 'grey', flex: 1},
  customButtonLogo: {
    height: 50,
    width: 80,
    borderRadius: 5,
    overflow: 'hidden',
  },
  buttonCreateAccount: {
    marginBottom: 40,
  },
  textCreateAccount: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
});
export default LoginScreen;
