import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { auth } from '../firebase';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log("user: ", user)
            setUser(user)
            setIsLoading(false)
        })

        return unsubscribe;
    })

    const logIn = async (email, password) => {
        console.log("calling log in")
        try {
            await auth.signInWithEmailAndPassword(email, password);
            console.log("Login")
        } catch (error) {
            console.log("error: ", error)
        }
    }
    const signOut = async () => {
        console.log("submitting log out")
        try {
            await auth.signOut()
            console.log("user logged out")
        } catch (error) {
            console.log("error: ", error)
        }
    }

    const signUp = async (email, password) => {
        try {
            await auth.createUserWithEmailAndPassword(email, password)
            console.log("Creating User")
        } catch (error) {
            console.log("error: ", error)
        }
    }

    return (
        <AuthContext.Provider value={{ isLoading, user, logIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}