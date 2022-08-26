import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC4kv41W6xnqHliPBGbkTEnWv2DezCzP5w",
  authDomain: "givealittle-coms3.firebaseapp.com",
  projectId: "givealittle-coms3",
  storageBucket: "givealittle-coms3.appspot.com",
  messagingSenderId: "127398312249",
  appId: "1:127398312249:web:4a8761a11ba09dc58ad0e8",
  measurementId: "G-L94XRXSQ40"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export {auth,fs,storage}