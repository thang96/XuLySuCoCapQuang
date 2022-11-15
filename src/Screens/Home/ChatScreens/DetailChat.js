import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import CustomAppBar from '../../../Components/CustomAppBar';
import {icons, colors, images} from '../../../Constants';
import CustomTwoButtonFunction from '../../../Components/CustomTwoButtonFunction';
import CustomInput from '../../../Components/CustomInput';

const DetailChat = props => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={route?.params?.item?.name}
        iconsLeft={icons.back}
        onPressIconsLeft={() => navigation.goBack()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
export default DetailChat;
