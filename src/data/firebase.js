import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
console.log('<Firebase  /> renderd');
const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  //   apiKey: "AIzaSyBgWpONHzq9ziKPOSJDC1V_AtIO2SyTmAI",
  //   authDomain: "react-redux-firebase-aut-2a95e.firebaseapp.com",
  //   databaseURL:
  //     "https://react-redux-firebase-aut-2a95e-default-rtdb.firebaseio.com",
  //   projectId: "react-redux-firebase-aut-2a95e",
  //   storageBucket: "react-redux-firebase-aut-2a95e.appspot.com",
  //   messagingSenderId: "442020902504",
  //   appId: "1:442020902504:web:3cea23e18b099984796ddd",
  //   measurementId: "G-L0JQ649JVE",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export default db;
export { auth, provider };
