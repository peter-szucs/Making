import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import TaskInfo from '../screens/taskscreens/TaskInfo';
import TaskList from '../screens/taskscreens/TaskList';
import Tasks from '../screens/taskscreens/Tasks';
import { styles, buttons } from '../styles/styles';

const TaskStack = createStackNavigator();

const taskListName = "Default Tasklist"

export default function TasksStack() {
  const { user } = useContext(AuthContext)

  return (
    <TaskStack.Navigator initialRouteName="Task List">
      <TaskStack.Screen 
        name="Task List" 
        component={Tasks}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                console.log("Add pressed")
              }}
              style={buttons.addIcon} >
              <Ionicons name="add" size={26} color='#007bff' />
              <Text style={{ color: '#007bff' }}>New list</Text>
            </TouchableOpacity>
          )
        }} />
      <TaskStack.Screen name={taskListName} component={TaskList} />
      <TaskStack.Screen name="Task Info" component={TaskInfo} />
    </TaskStack.Navigator>
  );
}
