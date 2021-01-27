import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../screens/Main';
import Settings from '../screens/Settings';
import { Ionicons } from '@expo/vector-icons';

//const Stack = createStackNavigator()
const Tabs = createBottomTabNavigator()

export default function AuthenticatedStack() {
  return (
      <Tabs.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Main') {
              iconName = focused
                ? 'home' : 'home-outline'
            } else if (route.name === 'Settings') {
              iconName = focused
                ? 'settings' : 'settings-outline'
            }
            return <Ionicons name={iconName} size={size} color={color} />
          }
        })}
        tabBarOptions={{
          activeTintColor: '#4fb39f',
          inactiveTintColor: '#a2a2a2',
          activeBackgroundColor: '#f2f2f2',
          labelStyle: { fontSize: 14, color: 'black' }
        }}
        initialRouteName="Main">
        <Tabs.Screen name="Main" component={Main} options={{ tabBarBadge: 3 }}/>
        <Tabs.Screen name="Settings" component={Settings} />
      </Tabs.Navigator>   
  );
}