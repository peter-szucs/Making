import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Context } from '../context/Context';
import AuthenticatedStack from './AuthenticatedStack';
import UnauthenticatedStack from './UnauthenticatedStack';
import Splash from '../screens/Splash';


export default function Navigation() {
    const { user, isLoading, fetchTasksList } = useContext(Context);

    if (isLoading) {
        return <Splash />
    }

    return (
        <NavigationContainer>
            {user ? <AuthenticatedStack /> : <UnauthenticatedStack />}
        </NavigationContainer>

    );
}