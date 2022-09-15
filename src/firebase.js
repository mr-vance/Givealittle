import firebase from 'firebase/compat/app'
import "firebase/compat/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyBs7ggwCZe1kZU-_8tK3hENM8mR4F4nE0o",
  authDomain: "give-a-little-d525a.firebaseapp.com",
  databaseURL: "https://give-a-little-d525a-default-rtdb.firebaseio.com",
  projectId: "give-a-little-d525a",
  storageBucket: "give-a-little-d525a.appspot.com",
  messagingSenderId: "392348497447",
  appId: "1:392348497447:web:11be1695e3764c3122c002",
  measurementId: "G-VTY0MM9XV4"
})

export const auth = app.auth()
export default app