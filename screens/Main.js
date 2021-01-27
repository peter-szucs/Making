import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { styles, buttons } from '../styles/styles';

export default function Main({ navigation }) {
  const { user, signOut } = useContext(AuthContext)

  // Will be removed, put in profile
  navigation.setOptions({
    headerRight: () => (
      <Button 
        title="Log Out"
        onPress={logOut} />
    )
  })

  const logOut = () => {
    console.log("Loggin out")
    signOut()
  }

  return (
    <View style={styles.container}>
      <Text>Main Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}
