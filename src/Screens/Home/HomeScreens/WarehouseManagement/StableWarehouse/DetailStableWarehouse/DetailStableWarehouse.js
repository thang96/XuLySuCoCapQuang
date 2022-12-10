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
  GetStableWarehouseByIdAPI,
  GetStableWarehouseSuppliesByIdAPI,
} from '../../../../../../Api/Home/StableWarehouseAPI/StableWarehouseAPI';
const DetailStableWarehouse = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = useSelector(state => state?.token?.token);
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  const [loading, setLoading] = useState(true);
  const [stableWarehouseResult, setStableWarehouseResult] = useState([]);
  const [stableWarehouseSuppliesResult, setStableWarehouseSuppliesResult] =
    useState([]);
  useEffect(() => {
    getResult();
  }, []);
  const getResult = async () => {
    let id = route.params;
    await GetStableWarehouseByIdAPI(token, id)
      .then(res => {
        setStableWarehouseResult(res?.data?.data);
        setLoading(false);
      })
      .catch(function (error) {
        // console.log(error);
      });
    await GetStableWarehouseSuppliesByIdAPI(token, id)
      .then(res => {
        setStableWarehouseSuppliesResult(res?.data?.data?.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Chi tiết kho'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />

      {loading ? (
        <ActivityIndicator size="large" color={colors.mainColor} />
      ) : (
        <ScrollView style={styles.eachContainer}>
          <View style={styles.viewShow}>
            <Text style={styles.styleContent}>Chi tiết kho : </Text>
            <CustomViewRow
              title={'Tên : '}
              content={stableWarehouseResult?.name}
            />
            <CustomViewRow
              title={'Mã : '}
              content={stableWarehouseResult?.code}
            />
            <CustomViewRow
              title={'Thời gian tạo : '}
              content={stableWarehouseResult?.created_time}
            />
            <CustomViewRow
              title={'Mô tả : '}
              content={stableWarehouseResult?.description}
            />
          </View>
          <View style={[styles.viewShow, {marginTop: 30}]}>
            <Text style={styles.styleContent}>Chi tiết vật tư trong kho :</Text>
            <View style={[styles.viewRow, {marginBottom: 10}]}>
              <Text style={styles.styleContent}>Tên vật tư</Text>
              <Text style={styles.styleContent}>Số lượng</Text>
            </View>
            {stableWarehouseSuppliesResult.map(item => {
              return (
                <View
                  key={`${item?.id}`}
                  style={[styles.viewRow, {marginVertical: 5}]}>
                  <Text style={styles.styleContent}>
                    {item?.supplies?.name}
                  </Text>
                  <Text style={styles.styleContent}>{item?.quantity}</Text>
                </View>
              );
            })}
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
  viewShow: {
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
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
export default DetailStableWarehouse;
