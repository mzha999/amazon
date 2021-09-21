import firebase from "firebase";
import "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCweDe5w99kaIz073g3e4Qe12Xf6t4miF8",
    authDomain: "fir-d55a1.firebaseapp.com",
    projectId: "fir-d55a1",
    storageBucket: "fir-d55a1.appspot.com",
    messagingSenderId: "537494649082",
    appId: "1:537494649082:web:3187f5f9e9efde49323143",
    measurementId: "G-5NN68BE693"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()

  export { db, auth }