import React, { useContext, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Context } from '../../context/Context';
import { styles, buttons } from '../../styles/styles';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TaskInfo({ navigation }) {
  const { user } = useContext(Context)

  const [date, setDate] = useState(new Date())

  return (
    <View style={styles.container}>
        <Text style={{ fontSize: 36, fontWeight: 'bold' }}>TaskInfo</Text>
        <DateTimePicker
          style={{width:'40%'}}
          value={ date }
          mode='default'
          display='default'
          onChange={ date => setDate(date) } />
    </View>  
        
  );
}
