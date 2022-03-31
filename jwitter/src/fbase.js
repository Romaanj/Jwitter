import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCZG8s-b2mYd20b9-ONYZpDpggo4x-7yY8",
  authDomain: "jwitter-f829c.firebaseapp.com",
  projectId: "jwitter-f829c",
  storageBucket: "jwitter-f829c.appspot.com",
  messagingSenderId: "251600630923",
  appId: "1:251600630923:web:e083ffba30037263e7d08e"
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const storageService = getStorage(app);