// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMmrpYiqzEROY7_oesJEmYV3q6yAiwV1o",
  authDomain: "ecoeats-726a9.firebaseapp.com",
  projectId: "ecoeats-726a9",
  storageBucket: "ecoeats-726a9.appspot.com",
  messagingSenderId: "1020427796434",
  appId: "1:1020427796434:web:7fff891b51dd55fdded20b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db };
