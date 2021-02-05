import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import TaskInfo from '../screens/taskscreens/TaskInfo';
import Tasks from '../screens/taskscreens/Tasks';
import TasksLists from '../screens/taskscreens/TaskLists';

const TaskStack = createStackNavigator();

export default function TasksStack() {
  const { user, tasksData, fetchTasksList } = useContext(Context)
  
   return (
    <TaskStack.Navigator initialRouteName="Task Lists">
      <TaskStack.Screen 
        name="Task Lists" 
        component={TasksLists} />
      <TaskStack.Screen name="Tasks" component={Tasks} />
      <TaskStack.Screen name="Task Info" component={TaskInfo} />
    </TaskStack.Navigator>
  );
}
