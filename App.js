import React from 'react';
import ContextProvider from './context/Context';
import Navigation from './navigation/Navigation';

export default function App() {
  return (
    <ContextProvider>
      <Navigation />
    </ContextProvider>
  );
}
