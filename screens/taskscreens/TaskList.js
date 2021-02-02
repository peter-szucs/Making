import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { styles, buttons } from '../../styles/styles';

export default function TaskList({ navigation }) {
  const { user } = useContext(AuthContext)

  return (
    <View style={styles.container}>
        <Text style={{ fontSize: 36, fontWeight: 'bold' }}>TaskList 01</Text>    
    </View>  
        
  );
}
