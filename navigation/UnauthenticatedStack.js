import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from '../screens/Login';
import CreateUser from '../screens/CreateUser';

const Stack = createStackNavigator()

export default function AuthenticatedStack() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LogIn} />
        <Stack.Screen name="CreateUser" component={CreateUser} />
      </Stack.Navigator>   
  );
}