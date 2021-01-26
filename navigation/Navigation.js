import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import AuthenticatedStack from './AuthenticatedStack';
import UnauthenticatedStack from './UnauthenticatedStack';
import Splash from '../screens/Splash';


export default function Navigation() {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Splash />
    }

    return (
        <NavigationContainer>
            {user ? <AuthenticatedStack /> : <UnauthenticatedStack />}
        </NavigationContainer>

    );
}