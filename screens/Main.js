import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { styles, buttons } from '../styles/styles';

export default function Main({ navigation }) {
  const { user, signOut } = useContext(AuthContext)
  let logo = require('../assets/Logo.png')

  return (
    <View style={{...styles.container, justifyContent: 'center'}}>
      <Image source={logo} />
      <Text style={{ fontSize: 36, fontWeight: 'bold' }}>Main Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}
