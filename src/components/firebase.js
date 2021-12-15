import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAt4rr8Ee3FdIF49VrbjMB_C2rKWORsWcQ",
    authDomain: "disneyplus-clone-964ed.firebaseapp.com",
    projectId: "disneyplus-clone-964ed",
    storageBucket: "disneyplus-clone-964ed.appspot.com",
    messagingSenderId: "94547846007",
    appId: "1:94547846007:web:8a14c580ff7277194a3772",
    measurementId: "G-XY1PM0PJ2K"
  };
  
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
// const storage = firebase.storage();
//dodaj storage posle u export-u ...
export { auth,provider };
export default db;