import firebase from "firebase/app"
import "firebase/firestore"


var firebaseConfig = {
    apiKey: "AIzaSyBHHnwzWErBQH6KVOGi6aGdkr4uKkKf3RI",
    authDomain: "auto-registro-96231.firebaseapp.com",
    projectId: "auto-registro-96231",
    storageBucket: "auto-registro-96231.appspot.com",
    messagingSenderId: "962576619134",
    appId: "1:962576619134:web:f2631e3b1f2db5771a6a2f"
  };

  export const firebaseApp=firebase.initializeApp(firebaseConfig)