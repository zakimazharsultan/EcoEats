// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDMmrpYiqzEROY7_oesJEmYV3q6yAiwV1o",
//   authDomain: "ecoeats-726a9.firebaseapp.com",
//   projectId: "ecoeats-726a9",
//   storageBucket: "ecoeats-726a9.appspot.com",
//   messagingSenderId: "1020427796434",
//   appId: "1:1020427796434:web:7fff891b51dd55fdded20b",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCWeyrQvDer4zw8gJXE0FjQDZev3oxgsYk",
  authDomain: "ecoeats-e67ce.firebaseapp.com",
  projectId: "ecoeats-e67ce",
  storageBucket: "ecoeats-e67ce.appspot.com",
  messagingSenderId: "383393378759",
  appId: "1:383393378759:web:45d6a73264945109d4e9e2",
  measurementId: "G-BJH17ME3YM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db };
