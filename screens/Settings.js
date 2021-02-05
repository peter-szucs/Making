import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { Context } from '../context/Context';
import { styles, buttons } from '../styles/styles';

export default function Settings({ navigation }) {
    const { user, signOut } = useContext(Context)

    let logo = require('../assets/Logo.png')

    return (
        <View style={{...styles.container, justifyContent: 'center'}}>
            <Image source={logo} />
            <Text style={{ fontSize: 36, fontWeight: 'bold' }}>Settings</Text>
            <Text>Here will be info about users lists and avatars as well</Text>
            <Button title="Log out" onPress={() => {
                signOut()}} />
            <StatusBar style="auto" />
        </View>
    );
}
