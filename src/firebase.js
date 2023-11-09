import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBku7_xoV_Bm7-6N6Lownr71kFXl_cwgJk",
  authDomain: "todoapp-67c2a.firebaseapp.com",
  projectId: "todoapp-67c2a",
  storageBucket: "todoapp-67c2a.appspot.com",
  messagingSenderId: "667307078494",
  appId: "1:667307078494:web:573454cf66655292ea55cf",
  measurementId: "G-1S9NJFHXDJ"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
export default database;