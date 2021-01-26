import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';
import { AuthContext } from '../context/AuthContext';
import { styles, buttons } from '../styles/styles';

export default function CreateUser() {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { signUp } = useContext(AuthContext)

    const submitSignUp = () => {
        signUp(email, password)
    }

    return (
        <View style={styles.container}>
        <Text style={{ fontSize: 36, fontWeight: 'bold' }}>Create User</Text>
        <View style={styles.inputView}>
            <TextInput 
                style={styles.textInput}
                placeholder="Enter Username"
                value={userName}
                onChangeText={setUserName} />
        </View>
        <View style={styles.inputView}>
            <TextInput 
                style={styles.textInput}
                placeholder="Enter Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail} />
        </View>
        <View style={styles.inputView}>
            <TextInput 
                style={styles.textInput}
                placeholder="Enter Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword} />
        </View>
        <View style={styles.inputView}>
            <TouchableOpacity
                style={buttons.primary}
                onPress={submitSignUp}>
                    <Text style={{ fontSize: 18 }}>Submit</Text>
            </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
        </View>
    );
}
