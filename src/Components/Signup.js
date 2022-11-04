//importing all the relevant things for the sign up page
import React,{useState, useEffect, useRef} from 'react'
import {auth,fs} from '../Config/Config'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {Icon} from 'react-icons-kit'
import logo from '../Images/logo.png'

//exporting the sign up as a const   
export const Signup = () => {

    const history = useHistory();  
    //initializing the variables such as full name, email and password
    const [fullName, setFullname]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    //initializing the error message variable and the success message when all is well
    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

    // getting current user function
    function GetCurrentUser(){
        //setting the current user to a variable
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
    //setting the constant variable user to the current user by calling a function
    const user = GetCurrentUser();
    //the function for the navigation bae which will be later used
    function Navbar(){
        const history = useHistory();

        const handleLogout=()=>{
            auth.signOut().then(()=>{
                history.push('/login');
            })
        }
    
       
    //Navigation bar
        return (
            <div className='navbar'>
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
    //handling when the user signs up
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
                //the message that the user will see after successfully signing up
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
    //putting the navbar in place and other components for the user's satisfaction
    return (
        <>
             <br></br>
            <Navbar />
        <div className='container'>
            <br></br>
            <br></br>
            <h1>Sign Up</h1>
            <hr></hr>
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form className='form-group' autoComplete="off" onSubmit={handleSignup}>
                <label>Full Name</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setFullname(e.target.value)} value={fullName}></input>
                <br></br>
                <label>Email</label>
                <input type="email" className='form-control' required
                 onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                <br></br>
                <label>Password</label>
                <input type="password" className='form-control' required
                 onChange={(e)=>setPassword(e.target.value)} value={password}></input>
                <br></br>
                <div className='btn-box'>
                    <span>Already have an account Login
                    <Link to="login" className='link'> Here</Link></span>
                    <button type="submit" className='btn btn-success btn-md'>SIGN UP</button>
                </div>
            </form>
            {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>                
            </>}
        </div>
        </>
    )
}
