import React, { useContext } from 'react';
import {
  Image,
  ImageBackground,
  SectionList,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { Context } from '../context/Context';
import { styles, text } from '../styles/styles';
import { useEffect } from 'react/cjs/react.development';
import { MainListItems } from '../listcomponents/MainListItems';

export default function Main({ }) {
  const { userObject, fetchUser, sectionListData, tasksFailed } = useContext(
    Context
  );

  let topBarBackgroundPic = require('../assets/TopBarCut.png');
  let backgroundImage = require('../assets/Background-dirty.png');

  const avatarPaths = [
    require('../assets/Avatar11.png'),
    require('../assets/Logo.png'),
  ];

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    // update list of tasks here
  }, [userObject]);

  return (
    <View style={{ ...styles.container }}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        source={backgroundImage}
        opacity="0.5"
        style={{ width: '100%', height: '100%' }}
      >
        <ImageBackground
          source={topBarBackgroundPic}
          opacity="0.7"
          style={{ ...styles.mainInfoBox, resizeMode: 'cover' }}
        >
          <View style={styles.mainInfoBoxColumnContainers}>
            <Text
              style={{
                ...text.mainInfoBoxText,
                fontSize: 24,
                fontWeight: 'bold',
              }}
            >
              {userObject.userName}
            </Text>
            <Text style={{ ...text.mainInfoBoxText, fontSize: 16 }}>
              Points: {userObject.totalPoints}
            </Text>
            <Text style={text.mainInfoBoxText}>
              Completed Tasks: {userObject.tasksCompleted}(
              {userObject.tasksCompleted * 2} points)
            </Text>
            <Text
              style={{
                ...text.mainInfoBoxText,
                color: 'rgb(255, 59, 48)',
                backgroundColor: 'rgba(200, 200, 200, 0.2)',
              }}
            >
              Tasks failed: {tasksFailed}(-{tasksFailed * 2} points)
            </Text>
          </View>
          <View style={styles.mainInfoBoxColumnContainers}>
            <Image
              source={avatarPaths[userObject.avatarPath]}
              style={styles.avatarImage}
            />
            <View style={styles.healthBarBackground}>
              <View
                style={{
                  backgroundColor: '#e31',
                  height: 20,
                  width: '80%',
                  borderRadius: 5,
                  marginVertical: 1,
                  justifyContent: 'center',
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 12,
                alignSelf: 'center',
                color: 'white',
                backgroundColor: 'rgba(20, 20, 20, 0.2)',
              }}
            >
              Health: 80/100
            </Text>
          </View>
        </ImageBackground>
        <View
          style={{
            paddingVertical: 10,
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <SectionList
            style={{ width: '95%' }}
            sections={sectionListData}
            renderItem={({ item }) => <MainListItems item={item} />}
            renderSectionHeader={({ section: { heading } }) => (
              <View
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(220, 220, 210, 0.9)',
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={text.sectionHeaderText}>{heading}</Text>
              </View>
            )}
            keyExtractor={(item) => item.taskId.toString()}
            ListEmptyComponent={<Text>Nothing here</Text>}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
