import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Context } from '../context/Context';
import { styles, buttons } from '../styles/styles';

export default function Settings({ navigation }) {
    const { user, signOut } = useContext(Context)

    return (
        <View style={{...styles.container, justifyContent: 'center'}}>
            <Text style={{ fontSize: 36, fontWeight: 'bold' }}>Settings</Text>
            <Button title="Log out" onPress={() => {
                signOut()}} />
            <StatusBar style="auto" />
        </View>
    );
}
