import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

let logo = require('../assets/Logo.png')

export default function Splash() {
    return (
        <View style={styles.container}>
            <View>
                <Image source={logo} />
            </View>
            <ActivityIndicator animating={true} size="large"/>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });