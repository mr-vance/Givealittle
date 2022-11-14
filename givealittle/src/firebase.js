import firebase from "firebase/app";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyA5tPGf-y0DBHZiA3153JCCvIVBR86bm-4",
    authDomain: "tradeit-ee7eb.firebaseapp.com",
    projectId: "tradeit-ee7eb",
    storageBucket: "tradeit-ee7eb.appspot.com",
    messagingSenderId: "711726893327",
    appId: "1:711726893327:web:eab04bbfc2e8cca79c967a",
    measurementId: "G-XKFKLDYSEK"
};

if (!firebase.apps.length) {
//   firebase.initializeApp(config);
}
// export const firestore = firebase.firestore();