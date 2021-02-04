import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { auth, db } from '../firebase';

export const Context = createContext();

export default function ContextProvider({ children }) {
    const [user, setUser] = useState();
    const [tasksData, setTasksData] = useState([]);
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
    
        let returnList = []

        for (const task of list) {
            //let taskItemInfo = { taskId: "", description: "", expiryDate: "", isFinished: false }
            let taskItemInfoList = []
            //let taskItem = { id: "", name: "", tasks: [{ taskId: "", description: "", expiryDate: "", isFinished: false }] }
            let taskItem = task
            let dbTasks = await db.collection('users').doc(uid).collection('taskLists').doc(task.id).collection('tasks').get()
            dbTasks.forEach(function(doc) {
                let taskItemInfo = doc.data()
                taskItemInfo.taskId = doc.id
                taskItemInfoList.push(taskItemInfo)
            })
            taskItem.tasks = taskItemInfoList
            returnList.push(taskItem)
        }
        return returnList
    }

    async function createList(listName) {
        await db.collection('users').doc(user.uid).collection('taskLists').add({ name: listName })
        .then(() => {
            console.log("New List", listName, "created.")
        })
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
            console.log("Fetch started")
            let tempListOfTasks = await fetchListOfTasks(uid)
            let fetchedTaskData = await fetchTasks(uid, tempListOfTasks)
            setTasksData(fetchedTaskData)
            console.log("Fetch done")
        } catch (error) {
            console.log("error: ", error)
        }
    }

    const createNewList = async (name) => {
        try {
            await createList(name)
            fetchTasksList(user.uid)
        } catch (error) {
            console.log("error: ", error)
        }
    }

    const deleteList = async (id) => {
        try {
            await db.collection('users').doc(user.uid).collection('taskLists').doc(id).delete()
            fetchTasksList(user.uid)
        } catch (error) {
            console.log("error: ", error)
        }
    }

    const addOrDeleteOrUpdateTask = async (id, data, action) => {
        console.log("id: ", id, "data: ", data, "action: ", action)
        try {
            const dbRef = db.collection('users').doc(user.uid).collection('taskLists').doc(id.toString()).collection('tasks')
            switch (action) {
                case "add":
                    await dbRef.add(data)
                    console.log("Task added")
                    break;
                case "update":
                    await dbRef.doc(data.taskId).update(data)
                    console.log("Task updated")
                    break;
                case "delete":
                    await dbRef.doc(data.taskId).delete()
                    console.log("Task deleted")
                    break;
                default:
                    console.log("Something went very wrong if you ended up here")
                    break;
            }
            fetchTasksList(user.uid)
        } catch (error) {
            console.log("error: ", error)
        }
    }

    return (
        <Context.Provider value={{ isLoading, user, tasksData, logIn, signOut, signUp, fetchTasksList, createNewList, deleteList, addOrDeleteOrUpdateTask }}>
            {children}
        </Context.Provider>
    );
}