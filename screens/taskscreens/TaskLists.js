import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { AuthContext } from '../../context/AuthContext';
import { styles, buttons } from '../../styles/styles';
import { TaskListItems } from '../../listcomponents/TaskListItems';

export default function TasksLists({ navigation }) {
  const { user, tasksData } = useContext(AuthContext)

  return (
    <View style={styles.container}>
        <FlatList 
          style={{ backgroundColor:'#f2f2f2', padding: 10, width: '100%' }}
          data={tasksData}
          renderItem={({ item, index }) => 
            <TaskListItems
              item ={item} 
              navigation={navigation} />
          }
          keyExtractor={( item, index ) => index.toString()} />

    </View>       
  );
}
