import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { styles, buttons } from '../styles/styles';
import { db } from '../firebase';
import { useEffect, useState } from 'react/cjs/react.development';

export default function Main({ navigation }) {
  const { user } = useContext(AuthContext)
  const [x, setX] = useState({userName: "", totalPoints: 0})
  let logo = require('../assets/Logo.png')

  async function fetchUser() {
    let name = { userName: "", totalPoints: 0 }
    let userDoc = await db.collection('users').doc(user.uid).get()
    name = userDoc.data()
    return name
  } 
  

  useEffect(() => {
    async function fetch() {
      let n = await fetchUser()
      setX(n)
      console.log("x: ", x)
    }
    fetch()
  }, [])

  return (
    <View style={{...styles.container, justifyContent: 'center'}}>
      <Image source={logo} />
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Main Screen</Text>
      <Text>username: {x.userName}</Text>
      <Text>Points: {x.totalPoints}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
