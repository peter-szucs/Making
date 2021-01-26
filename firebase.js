import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAd77okp_gBCNvLcfqQm_-N__HP6aJ2Tt8",
    authDomain: "react-to-do-92cc3.firebaseapp.com",
    projectId: "react-to-do-92cc3",
    storageBucket: "react-to-do-92cc3.appspot.com",
    messagingSenderId: "395012898535",
    appId: "1:395012898535:web:2b45b5c50b9f45613b6c42",
    measurementId: "G-X3DVN9W5E7"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();