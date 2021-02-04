import React, { useContext } from 'react';
import { Image, ImageBackground, SectionList, StatusBar, Text, View } from 'react-native';
import { Context } from '../context/Context';
import { styles, text } from '../styles/styles';
import { useEffect, useState } from 'react/cjs/react.development';
import { isWithinDays } from '../functions';
import { FlatList } from 'react-native-gesture-handler';

export default function Main({ navigation }) {
  const { user, userObject, fetchUser, tasksData } = useContext(Context)
  const [sectionList, setSectionList] = useState()

  let logo = require('../assets/Logo.png')
  let topBarBackgroundPic = require('../assets/TopBarCut.png')

  // let d = isWithinDays(new Date(), 5)
  // console.log(d)

  const avatarPaths = [
    require('../assets/Avatar11.png'),
    require('../assets/Logo.png')
  ]
   
  useEffect(() => {
    fetchUser()

  }, [])

  useEffect(() => {
    // update list of tasks here
  }, [userObject])

  return (
    <View style={{...styles.container}}>
      <StatusBar barStyle='dark-content' />
      {/* <View style={{ height: 60 }} /> */}
      <ImageBackground source={logo} opacity='0.2' style={{...styles.mainInfoBox, resizeMode: 'cover'}}>
        <View style={styles.mainInfoBoxColumnContainers}>
          <Text style={{ ...text.mainInfoBoxText, fontSize: 24, fontWeight: 'bold' }}>{userObject.userName}</Text>
          <Text style={{ ...text.mainInfoBoxText, fontSize: 16 }}>Points: {userObject.totalPoints}</Text>
          <Text style={text.mainInfoBoxText}>Completed Tasks: {userObject.tasksCompleted}({userObject.tasksCompleted * 2} points)</Text>
          <Text style={{ ...text.mainInfoBoxText, color: '#f20' }}>Tasks failed: {userObject.tasksFailed}(-{userObject.tasksFailed * 2} points)</Text>
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
      <Text style={text.mainScreenListTitle}>Upcoming Tasks:</Text>
      <SectionList />
    </View>
  );
}
