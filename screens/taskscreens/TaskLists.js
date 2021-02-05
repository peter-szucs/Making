import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Text, View, Modal, TextInput } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Context } from '../../context/Context';
import { styles, buttons } from '../../styles/styles';
import { TaskListItems } from '../../listcomponents/TaskListItems';
import { Ionicons } from '@expo/vector-icons';

export default function TasksLists({ navigation }) {
  const { tasksData } = useContext(Context);
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}
          style={buttons.addIcon}
        >
          <Ionicons name="add" size={26} color="#007bff" />
          <Text style={{ color: '#007bff' }}>New list</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // useIsFocused();

  return (
    <View style={styles.container}>
      <FlatList
        style={{ backgroundColor: '#f2f2f2', padding: 10, width: '100%' }}
        data={tasksData}
        renderItem={({ item, index }) => (
          <TaskListItems item={item} navigation={navigation} />
        )}
        //refreshing={willRefresh}
        keyExtractor={(item) => item.id.toString()}
      />
      <NewListModal visible={isVisible} updateVisibility={setIsVisible} />
    </View>
  );
}

const NewListModal = ({ visible, updateVisibility }) => {
  const { createNewList } = useContext(Context);
  const [newListName, setNewListName] = useState('My new List');

  return (
    <Modal visible={visible} transparent={true}>
      <View
        style={{
          backgroundColor: 'rgba(1, 1, 1, 0.4)',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderRadius: 10,
            width: '80%',
          }}
        >
          <Text style={{ padding: 20, fontSize: 18 }}>{newListName}</Text>
          <TextInput
            style={{
              width: '80%',
              padding: 10,
              backgroundColor: '#ddd',
              borderRadius: 10,
            }}
            placeholder="Enter name of list"
            onChangeText={(text) => setNewListName(text)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingTop: 10,
              paddingBottom: 20,
            }}
          >
            <Button title="Cancel" onPress={() => updateVisibility(false)} />
            <Button
              title="Done"
              onPress={async () => {
                // Upload new list to DB
                await createNewList(newListName);
                updateVisibility(false);
                setNewListName('My new List');
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
