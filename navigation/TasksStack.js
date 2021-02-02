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
  const { user } = useContext(AuthContext)
  const [data, setData] = useState([])
  const userTaskDb = db.collection('users').doc(user.uid).collection('taskLists')

  useEffect(() => {
    console.log("useEffect triggered in TaskStack")
    async function loadData() {
      let tempItems = await fetchTaskList()
      let items = await fetchTasks(tempItems)
      setData(items)
    }
    loadData()
  }, [])

  async function fetchTaskList() {
    console.log("inside async fetch")
    let taskItemInfo = { description: "", expiryDate: "", isFinished: false }
    let taskItem = { id: "", name: "", tasks: [{ taskId: "", description: "", expiryDate: "", isFinished: false }] }
    let tempTaskList = []
    let taskList = []
    
    let taskDoc = await userTaskDb.get()
    taskDoc.forEach(function(doc) {
      // taskItem.name = doc.data()
      taskItem = doc.data()
      taskItem.id = doc.id
      // let dbTasks = db.collection('users').doc(user.uid).collection('taskLists').doc(doc.id).collection('tasks').get()
      // dbTasks.forEach(function(doc) {
      //   console.log(doc.id, " => ", doc.data())
      //   taskItem = doc.data()
      // })
      tempTaskList.push(taskItem)
    })
    
    //taskList = await fetchTasks(tempTaskList)
    
    // tempTaskList.forEach(function(task) {
    //   let dbTasks = await db.collection('users').doc(user.uid).collection('taskLists').doc(task.id).collection('tasks').get()
    //   dbTasks.forEach(function(doc) {
    //     console.log(doc.id, " => ", doc.data())
    //     taskItem = doc.data()
    //   })
    // }) 
    
    return tempTaskList
  }

  async function fetchTasks(list) {
    let taskItemInfo = { description: "", expiryDate: "", isFinished: false }
    //let taskItem = { id: "", name: "", tasks: [{ taskId: "", description: "", expiryDate: "", isFinished: false }] }
    let returnList = []

    list.forEach(async function(task) {
      taskItem = task
      let dbTasks = await userTaskDb.doc(task.id).collection('tasks').get()
      dbTasks.forEach(function(doc) {
        console.log("for each in fetchTasks: ", doc.id, " => ", doc.data())
        taskItemInfo = doc.data()
        taskItem.tasks = taskItemInfo
        taskItem.tasks.id = doc.id
        returnList.push(taskItem)
      })
      console.log("Tasklist: ", returnList)
    })
    return returnList
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
