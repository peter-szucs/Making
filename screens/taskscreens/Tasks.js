import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { styles, buttons } from '../../styles/styles';

export default function Tasks({ navigation }) {
  const { user } = useContext(AuthContext)

  return (
    <View style={styles.container}>
        <Text style={{ fontSize: 36, fontWeight: 'bold' }}>Tasks</Text>    
    </View>  
        
  );
}
