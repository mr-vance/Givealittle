// Install Firebase on cmd/terminal with this command:
'npm install firebase'

//Install Firebase CLI on cmd/terminal with this command:
'npm install -g firebase-tools'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4kv41W6xnqHliPBGbkTEnWv2DezCzP5w",
  authDomain: "givealittle-coms3.firebaseapp.com",
  projectId: "givealittle-coms3",
  storageBucket: "givealittle-coms3.appspot.com",
  messagingSenderId: "127398312249",
  appId: "1:127398312249:web:4a8761a11ba09dc58ad0e8",
  measurementId: "G-L94XRXSQ40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
