import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCA3sWxXcudDffkCTkfSJaOpwVzAOTEdh8",
  authDomain: "petshop-c1b9e.firebaseapp.com",
  projectId: "petshop-c1b9e",
  storageBucket: "petshop-c1b9e.appspot.com",
  messagingSenderId: "770533721570",
  appId: "1:770533721570:web:10e96a971998fb54b0e5bb",
  measurementId: "G-XS9PWF11LH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
