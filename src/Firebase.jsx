import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const firebaseconfig = {};
const app = initializeApp(firebaseconfig);
const auth=getAuth(app);
