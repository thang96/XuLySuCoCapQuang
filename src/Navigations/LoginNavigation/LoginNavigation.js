import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  LoginScreen,
  ForgotPassword,
  ConfirmSuccessfulPasswordChange,
} from '../../Screens';
const Stack = createStackNavigator();
const LoginNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        component={LoginScreen}
        name={'LoginScreen'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ForgotPassword}
        name={'ForgotPassword'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ConfirmSuccessfulPasswordChange}
        name={'ConfirmSuccessfulPasswordChange'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default LoginNavigation;
