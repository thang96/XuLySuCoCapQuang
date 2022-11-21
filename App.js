import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/Store/store';
import MainNavigation from './src/Navigations/MainNavigation';
import 'react-native-gesture-handler';
import {
  requestUserPermission,
  NotificationServices,
} from './src/utils/PushNotification';
const App = () => {
  useEffect(() => {
    requestUserPermission();
    NotificationServices();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <GestureHandlerRootView style={styles.container}>
        <Provider store={store}>
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
