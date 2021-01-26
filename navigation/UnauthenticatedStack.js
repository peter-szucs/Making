import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from '../screens/Login';

const Stack = createStackNavigator()

export default function AuthenticatedStack() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LogIn} />
      </Stack.Navigator>   
  );
}