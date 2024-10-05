// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD39_DkjDxwu-mqc6F168kYVKziGzk7c9M",
  authDomain: "netflix-f2036.firebaseapp.com",
  projectId: "netflix-f2036",
  storageBucket: "netflix-f2036.appspot.com",
  messagingSenderId: "786807066348",
  appId: "1:786807066348:web:b20c507c43eebc2ec9dfc9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
