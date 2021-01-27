import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { styles, buttons } from '../styles/styles';

export default function Main({ navigation }) {
  const { user, signOut } = useContext(AuthContext)

   const logOut = () => {
    console.log("Loggin out")
    signOut()
  }

  return (
    <View style={{...styles.container, justifyContent: 'center'}}>
      <Text style={{ fontSize: 36, fontWeight: 'bold' }}>Settings</Text>
      <Button 
        title="Log Out"
        onPress={logOut} />
      <StatusBar style="auto" />
    </View>
  );
}
