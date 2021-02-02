import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Text, View, Modal, TextInput } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../context/AuthContext';
import { styles, buttons } from '../../styles/styles';
import { TaskListItems } from '../../listcomponents/TaskListItems';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

const NewListModal = ({ visible, updateVisibility }) => {
  const { createNewList } = useContext(AuthContext)
  const [newListName, setNewListName] = useState("My new List")
  
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
          borderRadius: 5,
          width: '60%'
        }} >
          <Text style={{ padding: 10, fontSize: 18 }}>{newListName}</Text>
          <TextInput
            style={{ width: '80%', padding: 10, backgroundColor: '#ddd' }}
            placeholder="Enter name of list"
            onChangeText={(text) => setNewListName(text)} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
            <Button title="Cancel" onPress={() => updateVisibility(false)} />
            <Button title="Done" onPress={async () => {
              // Upload new list to DB
              await createNewList(newListName)
              updateVisibility(false)
            }} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function TasksLists({ navigation }) {
  const { user, tasksData } = useContext(AuthContext)
  const [isVisible, setIsVisible] = useState(false)
  const [willRefresh, setWillRefresh] = useState(false)
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
            onPress={() => {
              setIsVisible(true)
            }}
            style={buttons.addIcon} >
            <Ionicons name="add" size={26} color='#007bff' />
            <Text style={{ color: '#007bff' }}>New list</Text>
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  const toggleRefresh = () => setWillRefresh(!willRefresh)

  useEffect(() => {
    console.log("TasksData useEffect")
    toggleRefresh
  }, [tasksData])

  useIsFocused();

  return (
    <View style={styles.container}>
        <FlatList 
          style={{ backgroundColor:'#f2f2f2', padding: 10, width: '100%' }}
          data={tasksData}
          extraData={willRefresh}
          renderItem={({ item, index }) => 
            <TaskListItems
              item ={item} 
              navigation={navigation} />
          }
          //refreshing={willRefresh}
          //keyExtractor={( item, index ) => item.id.toString()} 
        />
        <NewListModal visible={isVisible} updateVisibility={setIsVisible} />

    </View>       
  );
}
