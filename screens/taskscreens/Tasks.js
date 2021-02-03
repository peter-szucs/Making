import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Context } from '../../context/Context';
import { ListItems } from '../../listcomponents/Listitems';
import { styles, buttons } from '../../styles/styles';
import { Ionicons } from '@expo/vector-icons';

export default function Tasks({ navigation, route }) {
  const { user } = useContext(Context)
  console.log("route item: ", route.params.item)

  useEffect(() => {
    navigation.setOptions({ title: route.params.item.name })
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

  return (
    <View style={styles.container}>
        <FlatList 
          style={{ backgroundColor:'#f2f2f2', width: '100%' }}
          data={route.params.item.tasks}
          renderItem={({ item, index }) => 
            <ListItems
              item={item}
              navigation={navigation} />
          }
          keyExtractor={( item, index ) => index.toString()} />
    </View>  
        
  );
}
