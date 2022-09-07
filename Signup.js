import React,{useState} from 'react'
import {auth,fs} from '../Config/Config'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'

export const Signup = () => {

    const history = useHistory();

    const [fullName, setFullname]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

    const handleSignup=(e)=>{
        e.preventDefault();
        // console.log(fullName, email, password);
        auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
            console.log(credentials);
            //collecting the current's users signup details and sending the 
            //to the Firebase table called users
            fs.collection('users').doc(credentials.user.uid).set({
                
                FullName: fullName,
                Email: email,
                Password: password
            }).then(()=>{
                //if successfully signed up then you'll get a message saying 
                //you've signed up successfully and then you'll be redirect to the login page
                setSuccessMsg('Signup Successfull. You will now automatically get redirected to Login');
                setFullname('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setSuccessMsg('');
                    //redirect to the login page
                    history.push('/login');
                },3000)
            }).catch(error=>setErrorMsg(error.message));
        }).catch((error)=>{
            setErrorMsg(error.message)
        })
    }

    return (
        <div className='container'>
            //displaying what we need to signup , like the name, email address and password
            <br></br>
            <br></br>
            <h1>Sign Up</h1>
            <hr></hr>
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            //we also have the link to the login page if you already have an account
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
    )
}
