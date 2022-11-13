import React,{useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import {auth,fs} from '../Config/Config'
import {useHistory} from 'react-router-dom'
import logo from '../Images/logo.png'
import Footer from '../Footer'
import {Icon} from 'react-icons-kit'
import { MDBInput } from 'mdb-react-ui-kit';
import "rsuite/dist/rsuite.min.css";
import { Button } from 'react-bootstrap'
import OutsideFooter from './OutsideFooter'
import Spinner from 'react-bootstrap/Spinner';
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'

export const Login = () => {
    const [fullName, setFullname]=useState('');
    const searchRef = useRef();
    const history = useHistory();

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

    function GetCurrentUser(){
        const [user, setUser]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('users').doc(user.uid).get().then(snapshot=>{
                        setUser(snapshot.data().FullName);
                    })
                }
                else{
                    setUser(null);
                }
            })
        },[])
        return user;
    }

    const user = GetCurrentUser();

    function Navbar(){
        const history = useHistory();

        const handleLogout=()=>{
            auth.signOut().then(()=>{
                history.push('/login');
            })
        }
    
       
    //Navigation bar
        return (
            <div className='navbar' style={{marginTop:-25}} >
                <div className='leftside'>
                    <div className='logo'>
                        <Link to="/">
                        <img src={logo} alt="logo"/>
                        </Link>
                    </div>
                </div>
                <div className='rightside'>
                    {user&&<>
                        
                    </>}                     
                                    
                </div>
            </div>
    
        )
    }

    const handleSignup=(e)=>{
        e.preventDefault();
        // console.log(fullName, email, password);
        auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
            console.log(credentials);
            fs.collection('users').doc(credentials.user.uid).set({
                FullName: fullName,
                Email: email,
                Password: password
            }).then(()=>{
                setSuccessMsg('Signup Successfull. You will now automatically get redirected to Login');
                setFullname('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setSuccessMsg('');
                    history.push('/login');
                },3000)
            }).catch(error=>setErrorMsg(error.message));
        }).catch((error)=>{
            setErrorMsg(error.message)
        })
    }

    const handleLogin=(e)=>{
        e.preventDefault();
        // console.log(email, password);
        auth.signInWithEmailAndPassword(email,password).then(()=>{
            setSuccessMsg('Login Successfull. You will now automatically get redirected to Home page');
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(()=>{
                setSuccessMsg('');
                history.push('/');
            },3000)
        }).catch(error=>setErrorMsg(error.message));
    }

    return (
        <>
        <br></br>
            <Navbar />
        <div className='container'>
            <br></br>
            <br></br>
            <h1>Login</h1>
            <hr></hr>
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form className='form-group' autoComplete="off"
            onSubmit={handleLogin}>               
                <label>Email</label>
                <input type="email" className='form-control' required
                onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                <br></br>
                <label>Password</label>
                <input type="password" className='form-control' required
                onChange={(e)=>setPassword(e.target.value)} value={password}></input>
                <br></br>
                <div className='btn-box'>
                    <span>Don't have an account? SignUp
                    <Link to="signup" className='link'> Here</Link></span>

                    <Button type="submit" variant="outline-primary">LogIn</Button>
                    
                </div>
                
            </form>
            {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>                
            </>}
        </div>
        <div className='footer' style={{marginTop:100}}>
            <OutsideFooter/>
        </div>
        </>
    )
}
