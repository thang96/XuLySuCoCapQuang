import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {colors} from '../Constants';
const CustomLoading = props => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(119,119,119,0.3)',
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}>
      <View
        style={{
          height: 120,
          backgroundColor: 'white',
          width: '100%',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: '900', fontSize: 24}}>Loading...</Text>
        <ActivityIndicator size="large" color={colors.purple} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});
export default CustomLoading;
