import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Modal, Platform, Text, View } from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Context } from '../../context/Context';
import { ListItems } from '../../listcomponents/Listitems';
import { styles, buttons } from '../../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Tasks({ navigation, route }) {
  const { tasksData } = useContext(Context)
  const [isVisible, setIsVisible] = useState(false)
  const [listData, setListData] = useState(route.params.item)
  //console.log("route item: ", route.params.item)
  
  useEffect(() => {
    console.log("onMount")
    navigation.setOptions({ title: route.params.item.name })
    // sortList(route.params.item)
    // getDataFromState()
   }, [])

  useEffect(() => {
    console.log("onTasksDataChanged")
    getDataFromState()
  }, [tasksData])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
            onPress={() => {
              setIsVisible(true)
            }}
            style={buttons.addIcon} >
            <Ionicons name="add" size={26} color='#007bff' />
            <Text style={{ color: '#007bff' }}>New task</Text>
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  function getDataFromState() {
    let listToSet = {}
    for (const list of tasksData) {
      if (list.id === route.params.item.id) {
        let listToSort = list
        listToSet = sortList(listToSort)
      }
    }
    console.log("List data used in Tasks Flatlist: ", listToSet)
    setListData(listToSet)
  }

  function sortList(list) {
    let sortedByFinishList = list.tasks.sort(function(x, y) {
      return (x.isFinished === y.isFinished)? 0 : x.isFinished? 1 : -1
    })
    // let sortedList = sortedByFinishList.tasks.sort((a, b) => a.expiryDate.localeCompare(b.expiryDate))
    // let sortedList = sortedByFinishList.sort((a, b) => a.expiryDate.split('-').reverse().join().localeCompare(b.expiryDate.split('-').reverse().join()))
    return sortedByFinishList
  }

  
  //--------TESTING------------

  //-----------------------------

  return (
    <View style={styles.container}>
        <FlatList 
          style={{ backgroundColor:'#f2f2f2', width: '100%', height: 200 }}
          data={listData}
          renderItem={({ item, index }) => 
            <ListItems
              item={item}
              navigation={navigation}
              listId={route.params.item.id} />
          }
          keyExtractor={ item => item.taskId.toString()} />
        <NewTaskModal visible={isVisible} updateVisibility={setIsVisible} listId={route.params.item.id} />
    </View>  
        
  );
}

const NewTaskModal = ({ visible, updateVisibility, listId }) => {
  const { addOrDeleteOrUpdateTask } = useContext(Context)
  const [newTaskName, setNewTaskName] = useState("New Task")
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
  }

  return (
    <Modal visible={visible} transparent={true}>
      <View style={{ 
        backgroundColor: 'rgba(1, 1, 1, 0.4)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center' 
      }} >
        <View style={{ 
          backgroundColor: 'white',
          justifyContent: 'space-around',
          alignItems: 'center',
          borderRadius: 10,
          width: '80%'
        }} >
          <Text style={{ padding: 20, fontSize: 18 }}>{newTaskName}</Text>
          <TextInput
            style={{ width: '90%', padding: 10, backgroundColor: '#eee', borderRadius: 10 }}
            placeholder="Enter name of task"
            onChangeText={(text) => setNewTaskName(text)} />
          <Text>Set Expiry Date</Text>
          <DateTimePicker 
            style={{ width: '100%', backgroundColor: '#fff' }}
            testID="dateTimePicker" 
            value={date}
            mode="date"
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingBottom: 20 }}>
            <Button title="Cancel" onPress={() => updateVisibility(false)} />
            <Button title="Done" onPress={async () => {
              // Upload new task to DB
              console.log("date: ", date, "toString: ", date.toISOString())
              let taskToUpload = { description: newTaskName, expiryDate: date.toISOString(), isFinished: false }
              // console.log("Task to upload is: ", taskToUpload)
              await addOrDeleteOrUpdateTask(listId, taskToUpload, "add")
              updateVisibility(false)
              setNewTaskName("New Task")
              setDate(new Date())
            }} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

