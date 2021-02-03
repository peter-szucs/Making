import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { Context } from '../../context/Context';
import { styles, buttons } from '../../styles/styles';

export default function TaskInfo({ navigation }) {
  const { user } = useContext(AuthContext)

  return (
    <View style={styles.container}>
        <Text style={{ fontSize: 36, fontWeight: 'bold' }}>TaskInfo</Text>    
    </View>  
        
  );
}