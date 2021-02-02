import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { auth, db } from '../firebase';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState();
    const [tasksData, setTasksData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            //console.log("auth change useEffect called")
            setUser(user)
            setIsLoading(false)
        })
        return unsubscribe;
    })

    async function createDatabase(uid, name) {
        await db.collection('users').doc(uid).set({ userName: name, totalPoints: 0 })
    }

    async function fetchListOfTasks(uid) {
        let taskListItem = { id: "", name: "", tasks: [{ taskId: "", description: "", expiryDate: "", isFinished: false }] }
        let tempTaskList = []
        
        let taskDoc = await db.collection('users').doc(uid).collection('taskLists').get()
        taskDoc.forEach(function(doc) {
          taskListItem = doc.data()
          taskListItem.id = doc.id
          tempTaskList.push(taskListItem)
        })
         return tempTaskList
      }
    
      async function fetchTasks(uid, list) {
        let taskItemInfo = { taskId: "", description: "", expiryDate: "", isFinished: false }
        let taskItemInfoList = []
        let taskItem = { id: "", name: "", tasks: [{ taskId: "", description: "", expiryDate: "", isFinished: false }] }
        let returnList = []
    
        list.forEach(async function(task) {
          taskItem = task
          let dbTasks = await db.collection('users').doc(uid).collection('taskLists').doc(task.id).collection('tasks').get()
          dbTasks.forEach(function(doc) {
            taskItemInfo = doc.data()
            taskItemInfo.taskId = doc.id
            taskItemInfoList.push(taskItemInfo)
          })
          taskItem.tasks = taskItemInfoList
          returnList.push(taskItem)
        })
        return returnList
      }
    

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

    const signUp = async (email, password, name) => {
         try {
            console.log("Creating User")
            await auth.createUserWithEmailAndPassword(email, password)
            let uid = auth.currentUser.uid
            console.log("sign up: ", uid)
            await createDatabase(uid, name)
        } catch (error) {
            console.log("error: ", error)
        }
    }

    const fetchTasksList = async (uid) => {
        try {
            let tempListOfTasks = await fetchListOfTasks(uid)
            let fetchedTaskData = await fetchTasks(uid, tempListOfTasks)
            setTasksData(fetchedTaskData)
        } catch (error) {
            console.log("error: ", error)
        }
    }

    return (
        <AuthContext.Provider value={{ isLoading, user, tasksData, logIn, signOut, signUp, fetchTasksList }}>
            {children}
        </AuthContext.Provider>
    );
}