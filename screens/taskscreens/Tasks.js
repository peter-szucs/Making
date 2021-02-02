import React, { useContext, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { AuthContext } from '../../context/AuthContext';
import { ListItems } from '../../listcomponents/Listitems';
import { styles, buttons } from '../../styles/styles';

export default function Tasks({ navigation, route }) {
  const { user } = useContext(AuthContext)
  console.log("route item: ", route.params.item)

  useEffect(() => {
    navigation.setOptions({ title: route.params.item.name })
  }, [])

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
