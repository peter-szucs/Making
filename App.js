import React from 'react';
import { StyleSheet } from 'react-native';
import ContextProvider from './context/Context';
import Navigation from './navigation/Navigation';

export default function App() {
  return (
    <ContextProvider>
      <Navigation />
    </ContextProvider>
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
