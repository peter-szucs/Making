import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import AuthenticatedStack from './AuthenticatedStack';
import UnauthenticatedStack from './UnauthenticatedStack';
import Splash from '../screens/Splash';


export default function Navigation() {
    const { user, isLoading, fetchTasksList } = useContext(AuthContext);

    useEffect(() => {
        fetchTasksList()
    }, [])

    if (isLoading) {
        return <Splash />
    }

    return (
        <NavigationContainer>
            {user ? <AuthenticatedStack /> : <UnauthenticatedStack />}
        </NavigationContainer>

    );
}