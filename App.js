import React from 'react';
import { StyleSheet } from 'react-native';
import AuthContextProvider from './context/AuthContext';
import Navigation from './navigation/Navigation';

export default function App() {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
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
