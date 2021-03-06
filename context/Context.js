import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { auth, db } from '../firebase';
import { isOverdue, isToday, isWithinDays } from '../functions';

export const Context = createContext();

export default function ContextProvider({ children }) {
  const [user, setUser] = useState();
  const [tasksData, setTasksData] = useState([]);
  const [sectionListData, setSectionListData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userObject, setUserObject] = useState({
    userName: '',
    totalPoints: 0,
    avatarPath: 0,
    tasksCompleted: 0,
  });
  const [tasksFailed, setTasksFailed] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userInfo) => {
      setUser(userInfo);
      setIsLoading(false);
    });
    return unsubscribe;
  });

  async function fetchUserInfo() {
    let userDoc = await db.collection('users').doc(user.uid).get();
    let userToFetch = userDoc.data();
    return userToFetch;
  }

  async function createDatabase(uid, name) {
    await db.collection('users').doc(uid).set({
      userName: name,
      totalPoints: 0,
      avatarPath: 0,
      tasksCompleted: 0,
    });
  }

  async function fetchListOfTasks(uid) {
    let taskListItem = {
      id: '',
      name: '',
      tasks: [
        {
          taskId: '',
          description: '',
          expiryDate: '',
          isFinished: false,
          isExpired: false,
        },
      ],
    };
    let tempTaskList = [];

    let taskDoc = await db
      .collection('users')
      .doc(uid)
      .collection('taskLists')
      .get();
    taskDoc.forEach(function (doc) {
      taskListItem = doc.data();
      taskListItem.id = doc.id;
      tempTaskList.push(taskListItem);
    });

    return tempTaskList;
  }

  async function fetchTasks(uid, list) {
    let returnList = [];

    for (const task of list) {
      let taskItemInfoList = [];
      let taskItem = task;
      let dbTasks = await db
        .collection('users')
        .doc(uid)
        .collection('taskLists')
        .doc(task.id)
        .collection('tasks')
        .get();
      dbTasks.forEach(function (doc) {
        let taskItemInfo = doc.data();
        taskItemInfo.taskId = doc.id;
        taskItemInfoList.push(taskItemInfo);
      });
      taskItem.tasks = taskItemInfoList;
      returnList.push(taskItem);
    }
    return returnList;
  }

  async function createList(listName) {
    await db
      .collection('users')
      .doc(user.uid)
      .collection('taskLists')
      .add({ name: listName })
      .then(() => {
        console.log('New List', listName, 'created.');
      });
  }

  function createSectionList(tasksList) {
    let returnList = [];
    let todayList = [];
    let tomorrowList = [];
    let upcomingList = [];
    for (const taskList of tasksList) {
      for (const task of taskList.tasks) {
        if (
          !isOverdue(task.expiryDate) &&
          !task.isFinished &&
          isWithinDays(task.expiryDate, 5)
        ) {
          if (isToday(task.expiryDate)) {
            let itemToPush = { ...task, taskListId: taskList.id };
            // console.log("today item To push: ", itemToPush)
            todayList.push(itemToPush);
          } else if (isWithinDays(task.expiryDate, 1)) {
            let itemToPush = { ...task, taskListId: taskList.id };
            // console.log("tomorrow item To push: ", itemToPush)
            tomorrowList.push(itemToPush);
          } else {
            let itemToPush = { ...task, taskListId: taskList.id };
            // console.log("upcoming item To push: ", itemToPush)
            upcomingList.push(itemToPush);
          }
        }
      }
    }
    returnList = [
      { heading: 'Today', data: todayList },
      { heading: 'Tomorrow', data: tomorrowList },
      { heading: 'Upcoming', data: upcomingList },
    ];
    // console.log("Returnlist: ", returnList)
    return returnList;
  }

  function getFailedTaskAmount(list) {
    console.log('Inside getFailedFunc');
    let fails = 0;
    for (const taskList of list) {
      for (const task of taskList.tasks) {
        if (isOverdue(task.expiryDate)) {
          fails += 1;
          if (!task.isExpired) {
            updateToExpiredTask(taskList.id, task.taskId);
          }
        }
      }
    }
    console.log('Number of fails: ', fails);
    return fails;
  }

  const updateToExpiredTask = async (listId, taskId) => {
    let newTotalPoints = userObject.totalPoints - 2;
    await db
      .collection('users')
      .doc(user.uid)
      .collection('taskLists')
      .doc(listId)
      .collection('tasks')
      .doc(taskId)
      .update({ isExpired: true });
    await db
      .collection('users')
      .doc(user.uid)
      .update({ totalPoints: newTotalPoints });
    fetchUser();
  };

  const logIn = async (email, password) => {
    console.log('calling log in');
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('Login');
    } catch (error) {
      console.log('error: ', error);
    }
  };
  const signOut = async () => {
    console.log('submitting log out');
    try {
      await auth.signOut();
      console.log('user logged out');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const signUp = async (email, password, name) => {
    try {
      console.log('Creating User');
      await auth.createUserWithEmailAndPassword(email, password);
      let uid = auth.currentUser.uid;
      console.log('sign up: ', uid);
      await createDatabase(uid, name);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const fetchUser = async () => {
    console.log('Fetch User called');
    let uo = await fetchUserInfo();
    setUserObject(uo);
  };

  const fetchTasksList = async (uid) => {
    try {
      console.log('Fetch started');
      let tempListOfTasks = await fetchListOfTasks(uid);
      let fetchedTaskData = await fetchTasks(uid, tempListOfTasks);
      setTasksData(fetchedTaskData);
      let sectionList = createSectionList(fetchedTaskData);
      setSectionListData(sectionList);
      let tf = getFailedTaskAmount(fetchedTaskData);
      setTasksFailed(tf);
      console.log('Fetch done');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const createNewList = async (name) => {
    try {
      await createList(name);
      fetchTasksList(user.uid);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const deleteList = async (id) => {
    try {
      await db
        .collection('users')
        .doc(user.uid)
        .collection('taskLists')
        .doc(id)
        .delete();
      fetchTasksList(user.uid);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const addOrDeleteOrUpdateTask = async (id, data, action) => {
    console.log('id: ', id, 'data: ', data, 'action: ', action);
    try {
      const dbRef = db
        .collection('users')
        .doc(user.uid)
        .collection('taskLists')
        .doc(id.toString())
        .collection('tasks');
      switch (action) {
        case 'add':
          await dbRef.add(data);
          console.log('Task added');
          break;
        case 'update':
          let newTotalPoints = userObject.totalPoints + 2;
          let newTasksCompleted = userObject.tasksCompleted + 1;
          await dbRef.doc(data.taskId).update({
            description: data.description,
            expiryDate: data.expiryDate,
            isFinished: data.isFinished,
            isExpired: data.isExpired,
          });
          await db.collection('users').doc(user.uid).update({
            totalPoints: newTotalPoints,
            tasksCompleted: newTasksCompleted,
          });
          console.log('Task and user updated');
          break;
        case 'delete':
          await dbRef.doc(data.taskId).delete();
          console.log('Task deleted');
          break;
        default:
          console.log('Something went very wrong if you ended up here');
          break;
      }
      fetchTasksList(user.uid);
      fetchUser();
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <Context.Provider
      value={{
        isLoading,
        user,
        userObject,
        tasksData,
        sectionListData,
        tasksFailed,
        logIn,
        signOut,
        signUp,
        fetchUser,
        fetchTasksList,
        createNewList,
        deleteList,
        addOrDeleteOrUpdateTask,
      }}
    >
      {children}
    </Context.Provider>
  );
}
