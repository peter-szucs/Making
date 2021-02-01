import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { styles, buttons } from '../styles/styles';
import { db } from '../firebase';
import { useEffect, useState } from 'react/cjs/react.development';
import { TextInput } from 'react-native-gesture-handler';

export default function Main({ navigation }) {
  const { user } = useContext(AuthContext)
  const [userObject, setUserObject] = useState({userName: "", totalPoints: 0})
  let logo = require('../assets/Logo.png')

  async function fetchUser() {
    let userToFetch = { userName: "", totalPoints: 0 }
    let userDoc = await db.collection('users').doc(user.uid).get()
    userToFetch = userDoc.data()
    return userToFetch
  } 
  

  useEffect(() => {
    async function fetch() {
      let n = await fetchUser()
      await setUserObject(n)
      console.log("user: ", userObject)
    }
    fetch()
  }, [])

  return (
    <View style={{...styles.container, justifyContent: 'center'}}>
      <Image source={logo} />
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Main Screen</Text>
      <Text>Username: {userObject.userName}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
