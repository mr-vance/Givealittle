import React, { useContext } from 'react'
import { signupmethod } from '../firebase-config'         //import signup method in firebase config file
import { db } from '../firebase-config'               //imports database from firebase config file
import { collection, getDocs, addDoc } from "firebase/firestore"        //imports methods from firebase
import { useState, useEffect, useRef } from 'react'
import { NameContext, LoginContext } from '../Context'        //imports global name and login contexts
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './Login.css';
let move = false;       //variable to move to next page


export default function Signup() {
    const [newName, setNewName] = useState("");         //state for new user name
    const [newEmail, setNewEmail] = useState("");       //state for new user email
    const [newCell, setNewCell] = useState("");         //state for new user cellphone number
    const [users, setUsers] = useState([]);             //state for all user information
    const userRef = collection(db, "Users");            //refernce for users database
    const { name, setName } = useContext(NameContext);        //global context for name
    const { login, setLogin } = useContext(LoginContext);       //global context for login

    const [loading, setLoading] = useState(false);      //state used when process occurs
    const emailRef = useRef();      //refernce for email
    const passwordRef = useRef();     //refernce for password

    async function handleSignup() {  //function handles signup process
        setLoading(true);
        try {
            await signupmethod(emailRef.current.value, passwordRef.current.value);
            await addDoc(userRef, { Name: newName, Email: newEmail, Cell: newCell , isEligibleToPay:false});
            setName(emailRef.current.value);
            setLogin(true);
            move = true;
        } catch {
            alert('Error!')
        }
        setLoading(false);
        return move;
    }

    useEffect(() => {     //gets data from database
        const getUsers = async () => {
            const data = await getDocs(userRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getUsers()
    }, []);

    return (
        <div className="bigdiv">
            {
                move ? <Redirect to='/landing' />     //ternary for redirecting page if logged in
                    : null
            }
            <Navbar />
            <h1>Sign up</h1>
            <div className='logindivb'>    {/*form for entering user input*/}
                <input className="edtname" id="input" placeholder="Name" onChange={(event) => {
                    setNewName(event.target.value)
                }} />
                <br />
                <input className="edtcell" id="input" placeholder="Cell" onChange={(event) => {
                    setNewCell(event.target.value)
                }} />
                <br />
                <input ref={emailRef} className="edtemail" id="input" placeholder="Email" onChange={(event) => {
                    setNewEmail(event.target.value)
                }} />
                <br />
                <input ref={passwordRef} type="password" className="edtpassword" id="input" placeholder="Password" />
                <br />
                <button disabled={loading} className="btnlogin" id="btn" onClick={handleSignup}>Sign up</button>
            </div>
        </div>
    )
}

function Navbar() {     //function for navbar component
    const [showLinks, setShowLinks] = useState(false);
    return (
        <div className="navbar">      {/*contains all links for available pages*/}
            <div className="leftside">
                <div className="links" id={showLinks ? "hidden" : ""}>
                    <Link className="navlink" to='/'>
                        <p>Home</p>
                    </Link>
                    <Link className="navlink" to='/signup'>
                        <p>Signup</p>
                    </Link>

                    <Link className="navlink" to='/login'>
                        <p>Login</p>
                    </Link>
                    
                    <Link className="navlink" to='/homeabout'>
                        <p>About</p>
                    </Link>
                    <Link className="navlink" to='/homecontact'>
                        <p>Contact</p>
                    </Link>
                </div>
                <button onClick={() => setShowLinks(!showLinks)}>
                    ≡
                </button>
            </div>
        </div>
    )
}