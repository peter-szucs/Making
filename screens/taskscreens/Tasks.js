import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Modal, Platform, Text, View } from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Context } from '../../context/Context';
import { ListItems } from '../../listcomponents/Listitems';
import { styles, buttons } from '../../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Tasks({ navigation, route }) {
  const { user } = useContext(Context)
  const [isVisible, setIsVisible] = useState(false)
  const [listData, setListData] = useState(route.params.item)
  //console.log("route item: ", route.params.item)
  
  useEffect(() => {
    navigation.setOptions({ title: route.params.item.name })
    sortList(route.params.item)
    checkTimePassed(route.params.item.tasks[0])
  }, [])

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

  function sortList(list) {
    console.log("unsorted: ", list)
    let sortedByFinishList = list.tasks.sort(function(x, y) {
      return (x.isFinished === y.isFinished)? 0 : x.isFinished? 1 : -1
    })
    console.log("bool sort: ", sortedByFinishList)
    // let sortedList = sortedByFinishList.tasks.sort((a, b) => a.expiryDate.localeCompare(b.expiryDate))
    let sortedList = sortedByFinishList.sort((a, b) => a.expiryDate.split('-').reverse().join().localeCompare(b.expiryDate.split('-').reverse().join()))
    console.log("sorted list: ", sortedList)
  }

  //
  //--------TESTING------------
  function getParsedDate(dateString) {
    var date = new Date(dateString)
    var dd = date.getDate()
    var mm = date.getMonth() + 1
    var yyyy = date.getFullYear()
    if (dd < 10) {
      dd = '0'+ dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    date = dd + "-" + mm + "-" + yyyy
    return date.toString()
  }

  function checkTimePassed(item) {
    let currentDate = getParsedDate(new Date())
    console.log("Task:", item.description, "expires: ", item.expiryDate)
    console.log("Date now: ", currentDate)
    if (!item.isFinished) {
      if (item.expiryDate() > currentDate
      ()) {
        console.log("Expired")
      } else {
        console.log("still valid")
      }
    } else {
      console.log("Already done")
    }
  }
  //-----------------------------

  return (
    <View style={styles.container}>
        <FlatList 
          style={{ backgroundColor:'#f2f2f2', width: '100%', height: 200 }}
          data={route.params.item.tasks}
          renderItem={({ item, index }) => 
            <ListItems
              item={item}
              navigation={navigation} />
          }
          keyExtractor={( item, index ) => index.toString()} />
        <NewTaskModal visible={isVisible} updateVisibility={setIsVisible} />
    </View>  
        
  );
}

const NewTaskModal = ({ visible, updateVisibility }) => {
  const { createNewList } = useContext(Context)
  const [newTaskName, setNewTaskName] = useState("My new List")
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
  }

  function getParsedDate(dateString) {
    var date = new Date(dateString)
    var dd = date.getDate()
    var mm = date.getMonth() + 1
    var yyyy = date.getFullYear()
    if (dd < 10) {
      dd = '0'+ dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    date = dd + "-" + mm + "-" + yyyy
    return date.toString()
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
              let convertedDate = getParsedDate(date)
              console.log(convertedDate)
              // Upload new task to DB
              // await addNewTask(taskId, newTaskName)
              // updateVisibility(false)
              // setNewTaskName("My new List")
            }} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

