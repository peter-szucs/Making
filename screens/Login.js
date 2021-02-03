import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Context } from '../context/Context';
import { styles, buttons } from '../styles/styles';

export default function Login({ navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let logo = require('../assets/Logo.png')

    const { setIsCreatingUser, logIn } = useContext(Context)

    const submitLogin = () => {
        console.log("Logging in")
        logIn(email, password)
    }

    const createUser = () => {
        console.log("Creating User")
        //setIsCreatingUser(true)
        navigation.navigate("CreateUser")
    }

    return (
        <View style={styles.container}>
            <Image source={logo} />
            <Text style={{ fontSize: 36, fontWeight: 'bold', padding: 10 }}>Login</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoFocus={true}
                    //returnKeyType="next"
                    value={email}
                    onChangeText={setEmail} />
                </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    keyboardType="default"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword} />
            </View>
            <View style={styles.inputView}>
                <TouchableOpacity
                    style={buttons.primary}
                    onPress={submitLogin}>
                        <Text style={{ fontSize: 18 }}>Log In</Text>
                </TouchableOpacity>
        </View>
        
        <Button title="No user? Create one here" onPress={createUser} />
        <StatusBar style="auto" />
        </View>
    );
}

