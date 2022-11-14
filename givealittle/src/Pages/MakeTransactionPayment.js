import React from 'react';
import { NameContext, LoginContext ,CarddetailsContext ,CurrentUserContext } from '../Context'
import { useContext } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, setDoc ,doc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
import './MakeTransaction.css';
import { CartContext } from '../Context'
import { connectFirestoreEmulator } from 'firebase/firestore';
import { Bars } from 'react-loading-icons';
import Navigation from '../components/Navigation';



export default function MakeTransactionPayment() {
    const { User, setUser } = useContext(CurrentUserContext);
    const { name, setName } = useContext(NameContext)
    const { cardno, setCardNo } = useContext(CarddetailsContext);        //global context for name

    const [cardnumber, setCardNumber] = useState("");
    const [Expiredate, setExpiredate] = useState("");
    const [cvv, setCVV] = useState("");
    
    const itemRef = collection(db, "CardDetails");            //refernce for item
    const addItem = async () => {           //handles adding an item to database
      await addDoc(itemRef, { Name: name, CardNumber: cardnumber, CVV: cvv ,ExpireDate:Expiredate })
      setCardNo(cardnumber)
  }
  
  // update user eligibility to make a purchase in the database
  const UpDateRow = async (id) => {
    //handles adding a review to database
    await setDoc(
      doc(db, "Users", id),
      {
        isEligibleToPay: true    // subtract quantity from local cart item
      },
      { merge: true }
    );

  };

  function CheckOut() {
    UpDateRow(User.id);
    addItem();
  }

   return (
      <div>
           <Navigation />
           <div className='container'>      {/*form containing all inputs for user*/}
            <text className="itemname" >Add card</text>
            <br />
            <br />
            <input className="input" id="input" placeholder="Card" onChange={(event) => {
                    setCardNumber(event.target.value)
                    
            }}/>
            <br />          
            <br />
            <input className="input" id="input"  placeholder="MM/YY" onChange={(event) => {
                    setExpiredate(event.target.value)
            }}/>
            <br />
            <br />
            <input className="input" id="input" placeholder="123" onChange={(event) => {
                    setCVV(event.target.value)
            }}/>
            <br />
            <div className='center-add-card '>
            </div>
            
            <br />

            <Link to='/payment'>

           <button className="buyttonin-add-card" onClick={()=>CheckOut()} >Check out</button>
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