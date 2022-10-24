import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBs7ggwCZe1kZU-_8tK3hENM8mR4F4nE0o",
  authDomain: "give-a-little-d525a.firebaseapp.com",
  projectId: "give-a-little-d525a",
  storageBucket: "give-a-little-d525a.appspot.com",
  messagingSenderId: "392348497447",
  appId: "1:392348497447:web:11be1695e3764c3122c002",
  measurementId: "G-VTY0MM9XV4"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export {auth,fs,storage}