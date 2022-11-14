import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA5tPGf-y0DBHZiA3153JCCvIVBR86bm-4",
    authDomain: "tradeit-ee7eb.firebaseapp.com",
    projectId: "tradeit-ee7eb",
    storageBucket: "tradeit-ee7eb.appspot.com",
    messagingSenderId: "711726893327",
    appId: "1:711726893327:web:eab04bbfc2e8cca79c967a",
    measurementId: "G-XKFKLDYSEK"
};
 
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export function signupmethod(email, password) {         //function used to sign up new user on database
    return createUserWithEmailAndPassword(auth, email, password)
}
export function loginmethod(email, password) {              //function used to login an exiting user on database
    return signInWithEmailAndPassword(auth, email, password)
}

export const db = getFirestore(app);