import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Splash() {
    return (
        <View style={styles.container}>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 42, fontWeight: 'bold' }}>App logo</Text>
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