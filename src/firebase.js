// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3sGOgmXOyBGCAhsiiLj6IUooqafTRwEw",
  authDomain: "interfaz-47fc0.firebaseapp.com",
  projectId: "interfaz-47fc0",
  storageBucket: "interfaz-47fc0.appspot.com",
  messagingSenderId: "52030077068",
  appId: "1:52030077068:web:2431eab109007ad469e3a9",
  measurementId: "G-LQBB09WX3X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage };
