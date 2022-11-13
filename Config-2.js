// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs7ggwCZe1kZU-_8tK3hENM8mR4F4nE0o",
  authDomain: "give-a-little-d525a.firebaseapp.com",
  projectId: "give-a-little-d525a",
  storageBucket: "give-a-little-d525a.appspot.com",
  messagingSenderId: "392348497447",
  appId: "1:392348497447:web:11be1695e3764c3122c002",
  measurementId: "G-VTY0MM9XV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
