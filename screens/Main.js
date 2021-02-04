import React, { useContext } from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { Context } from '../context/Context';
import { styles } from '../styles/styles';
import { useEffect, useState } from 'react/cjs/react.development';

export default function Main({ navigation }) {
  const { user, userObject, fetchUser } = useContext(Context)
  let logo = require('../assets/Logo.png')
  let topBarBackgroundPic = require('../assets/TopBarCut.png')

  const avatarPaths = [
    require('../assets/Avatar11.png'),
    require('../assets/Logo.png')
  ]
   
  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    
  }, [userObject])

  return (
    <View style={{...styles.container}}>
      {/* <View style={{ height: 60 }} /> */}
      <ImageBackground source={logo} opacity='0.2' style={{...styles.mainInfoBox, resizeMode: 'cover'}}>
        <View style={styles.mainInfoBoxColumnContainers}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 5 }}>{userObject.userName}</Text>
          <Text style={{ fontSize: 16, padding: 5 }}>Points: {userObject.totalPoints}</Text>
          <Text style={{ padding: 5 }}>Completed Tasks: {userObject.tasksCompleted}({userObject.tasksCompleted * 2} points)</Text>
          <Text style={{ padding: 5, color: '#f20' }}>Tasks failed: {userObject.tasksFailed}(-{userObject.tasksFailed * 2} points)</Text>
        </View>
        <View style={styles.mainInfoBoxColumnContainers}>
          <Image source={avatarPaths[userObject.avatarPath]} style={styles.avatarImage}/>
          <View style={styles.healthBarBackground}>
            <View style={{
              backgroundColor: '#e31', 
              height: 20, 
              width: '80%', 
              borderRadius: 5, 
              marginVertical: 1, 
              justifyContent: 'center' }} />
          </View>
          <Text style={{fontSize: 12, alignSelf: 'center'}}>Health: 80/100</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
