import React, { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { Context } from '../context/Context';
import { styles } from '../styles/styles';
import { db } from '../firebase';
import { useEffect, useState } from 'react/cjs/react.development';

export default function Main({ navigation }) {
  const { user } = useContext(Context)
  const [userObject, setUserObject] = useState({userName: "", totalPoints: 0, avatarPath: ""})
  let logo = require('../assets/Logo.png')
  const avatarPaths = [
    require('../assets/Avatar11.png'),
    require('../assets/Logo.png')
  ]
  
  async function fetchUser() {
    //let userToFetch = { userName: "", totalPoints: 0, avatarPath: "" }
    let userDoc = await db.collection('users').doc(user.uid).get()
    userToFetch = userDoc.data()
    return userToFetch
  } 
  
  useEffect(() => {
    async function fetch() {
      let n = await fetchUser()
      await setUserObject(n)
    }
    fetch()
  }, [])

  useEffect(() => {
    console.log("userObject changed: ", userObject)
  }, [userObject])

  return (
    <View style={{...styles.container}}>
      <View style={{ height: 60 }} />
      <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', width: '100%', borderBottomWidth: 2, borderTopWidth: 2, borderColor: '#ddd' }}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 5 }}>{userObject.userName}</Text>
          <Text style={{ fontSize: 16, padding: 5 }}>Points: {userObject.totalPoints}</Text>
        </View>
        <View style={{ flexDirection: 'column', marginRight: 10 }}>
          <Image source={avatarPaths[userObject.avatarPath]} style={{ borderWidth: 3, borderColor: '#2b31b3', borderRadius: 10 }}/>
          <View style={{backgroundColor: '#fff', height: 22, width: '100%', marginRight: 10, marginTop: 2, borderWidth: 1, borderRadius: 5, alignItems: 'flex-start', justifyContent: 'center'}}>
          <View style={{backgroundColor: '#e00', height: 20, width: '100%', borderRadius: 5, marginVertical: 1, justifyContent: 'center' }} />
            
          
          </View>
          <Text style={{fontSize: 12, alignSelf: 'center'}}>Health: 100/100</Text>
        </View>
      </View>
    </View>
  );
}
