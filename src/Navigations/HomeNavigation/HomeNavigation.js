import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  CameraHome,
  ChooseTypeOfBusinessCard,
  TypeOfBusinessCard,
  ViewManuscript,
  EditTemplate,
  OrdersScreen,
  PaymentScreen,
} from '../../Screens';
const Stack = createStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CameraHome"
        component={CameraHome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChooseTypeOfBusinessCard"
        component={ChooseTypeOfBusinessCard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TypeOfBusinessCard"
        component={TypeOfBusinessCard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewManuscript"
        component={ViewManuscript}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditTemplate"
        component={EditTemplate}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default HomeNavigation;
