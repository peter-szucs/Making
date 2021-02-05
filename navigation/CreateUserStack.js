import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateUser from '../screens/CreateUser';

const Stack = createStackNavigator();

export default function CreateUserStack() {
  return (
    <Stack.Navigator initialRouteName="CreateUser">
      <Stack.Screen name="CreateUser" component={CreateUser} />
    </Stack.Navigator>
  );
}
