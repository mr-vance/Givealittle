import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { NameContext, LoginContext ,isEligibleContext  } from '../Context'
import { CartContext, AddressContext } from '../Context';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link , Redirect } from 'react-router-dom';
import './Home.css';
import './MakeTransaction.css';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from "firebase/firestore";
import Navigation from '../components/Navigation';



export default function MakeTransactionAddress() {

    const { login, setLogin } = useContext(LoginContext)  
    const { cart, setCart } = useContext(CartContext);
    const { name, setName } = useContext(NameContext)
    const [newCountry, setNewCountry] = useState(""); 

    const [country, setCountry] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const { isEligible, setIsEligible } = useContext(isEligibleContext);
    
    const addressRef = collection(db, "Address");            //refernce for item

    const { address, setAddress } = useContext(AddressContext);
    const [Users, setUsers] = useState([]);

    const addAddress = async () => {           //handles adding an item to database
      await addDoc(addressRef, { Name: name, Country: country, Province: province, City: city, Street: street })
      setAddress({ Name: name, Country: country, Province: province, City: city, Street: street })
        
    }
 
     
  return (
    <div>
      
        {   isEligible ? <Redirect to='/Payment'/>     //ternary for redirecting page if logged in
            : null }
          < Navigation />
          <div className='container'>      {/*form containing all inputs for user*/}
            
            <text className="itemname"> Enter address to proceed</text>   
            <br /> 
            <br/>
            <input className="edtemail" id="input"  placeholder="Country" onChange={(event) => {
                    setCountry(event.target.value)
            }}/> 
            <br />
            <input  className="edtpassword" id="input" placeholder="Province"onChange={(event) => {
                    setProvince(event.target.value)
            }} />
            <br />
            <input className="edtemail" id="input"  placeholder="City" onChange={(event) => {
                    setCity(event.target.value)
            }}/>
            <br />
            <input className="edtemail" id="input" placeholder="Street " onChange={(event) => {
                    setStreet(event.target.value)
            }}/>
            <br />
            <br />
            <Link to='/maketransactionpayment'>
              <button className="buttonin" onClick={addAddress}>Confirm</button>
            </Link> 

          </div>
          
      </div>
    )


}


function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  return (
    <div className="navbar">
      <div className="leftside">
        <div className="links" id={showLinks ? "hidden" : ""}>
          <Link className="navlink" to="/landing">
            <p>Home</p>
          </Link>
          <Link className="navlink" to="/login">
            <p>About</p>
          </Link>
          <Link className="navlink" to="/login">
            <p>Contact</p>
          </Link>
        </div>
        <button onClick={() => setShowLinks(!showLinks)} className="btnthings">
          ≡
        </button>
      </div>
    </div>
  );
}


