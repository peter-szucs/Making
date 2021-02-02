import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import TaskInfo from '../screens/taskscreens/TaskInfo';
import TaskList from '../screens/taskscreens/TaskList';
import Tasks from '../screens/taskscreens/Tasks';
import { styles, buttons } from '../styles/styles';
import { db } from '../firebase';

const TaskStack = createStackNavigator();
const taskListName = "Default Tasklist"

export default function TasksStack() {
  const { user, fetchTaskList } = useContext(AuthContext)
  const [data, setData] = useState([])
  const userTaskDb = db.collection('users').doc(user.uid).collection('taskLists')

  useEffect(() => {
    console.log("useEffect triggered in TaskStack")

    // async function loadData() {
    //   let tempItems = await fetchTaskList()
    //   let items = await fetchTasks(tempItems)
    //   setData(items)
    // }
    // loadData()
  }, [])

  async function fetchTaskList() {
    console.log("inside async fetch")
    let taskItem = { id: "", name: "", tasks: [{ taskId: "", description: "", expiryDate: "", isFinished: false }] }
    let tempTaskList = []
    
    let taskDoc = await userTaskDb.get()
    taskDoc.forEach(function(doc) {
      taskItem = doc.data()
      taskItem.id = doc.id
      tempTaskList.push(taskItem)
    })
     return tempTaskList
  }

  async function fetchTasks(list) {
    let taskItemInfo = { taskId: "", description: "", expiryDate: "", isFinished: false }
    let taskItemInfoList = []
    let taskItem = { id: "", name: "", tasks: [{ taskId: "", description: "", expiryDate: "", isFinished: false }] }

    list.forEach(async function(task) {
      taskItem = task
      let dbTasks = await userTaskDb.doc(task.id).collection('tasks').get()
      dbTasks.forEach(function(doc) {
        console.log("for each in fetchTasks: ", doc.id, " => ", doc.data())
        taskItemInfo = doc.data()
        taskItemInfo.taskId = doc.id
        taskItemInfoList.push(taskItemInfo)
      })
      taskItem.tasks = taskItemInfoList
      console.log("Tasklist: ", taskItem)
    })
    return taskItem
  }

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
