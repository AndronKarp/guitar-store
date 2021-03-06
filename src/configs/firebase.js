import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyDrF2CjklO0SlyV6Kv7pg7p67a4sLV3qbw",
  authDomain: "project-a0c8e.firebaseapp.com",
  databaseURL: "https://project-a0c8e.firebaseio.com",
  projectId: "project-a0c8e",
  storageBucket: "project-a0c8e.appspot.com",
  messagingSenderId: "686927330962",
  appId: "1:686927330962:web:6892625786538e6588304b",
  measurementId: "G-P6Q64LKV8Q"
};

firebase.initializeApp(config);

const database = firebase.database();
const guitarsRef = database.ref("guitars");
const unavailableEmailsRef = database.ref("unavailable-emails");
const cartsRef = database.ref("carts");
const auth = firebase.auth();
auth.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export { guitarsRef, auth, unavailableEmailsRef, cartsRef };
