import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/Store/store';
import MainNavigation from './src/Navigations/MainNavigation';
import 'react-native-gesture-handler';
const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
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
