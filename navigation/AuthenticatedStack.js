import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../screens/Main';
import Settings from '../screens/Settings';
import { Ionicons } from '@expo/vector-icons';
import TasksStack from './TasksStack';
import { Context } from '../context/Context';

const Tabs = createBottomTabNavigator()

export default function AuthenticatedStack() {
  const { user, fetchTasksList } = useContext(Context)

  useEffect(() => {
    fetchTasksList(user.uid)
  }, [])

  return (
      <Tabs.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Main') {
              iconName = focused
                ? 'home' : 'home-outline'
            } else if (route.name === 'Tasks') {
              iconName = focused
                ? 'list-circle' : 'list-circle-outline'
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
          labelStyle: { fontSize: 14 }
        }}
        initialRouteName="Main">
        <Tabs.Screen name="Main" component={Main} />
        <Tabs.Screen name="Tasks" component={TasksStack} />
        <Tabs.Screen name="Settings" component={Settings} />
      </Tabs.Navigator>   
  );
}