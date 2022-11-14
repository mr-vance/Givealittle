import React from 'react';
import ReactJsAlert from "reactjs-alert";
import { useContext } from 'react';
import { db } from '../firebase-config';
import {setDoc,doc} from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from 'react-router-dom';
import './Home.css';
import './MakeTransaction.css';
import { CartContext } from '../Context'
import { NameContext, LoginContext ,CarddetailsContext, AddressContext ,isEligibleContext} from '../Context'
import { connectFirestoreEmulator } from 'firebase/firestore';
import emailjs from 'emailjs-com'; // library used to send users emails
import Navigation from '../components/Navigation';

export default function Payment() {
    const { isEligible, setIsEligible } = useContext(isEligibleContext);
    const { cardno, setCardNo } = useContext(CarddetailsContext); 
    const [cartitems, setCartItems] = useState([])
    const { login, setLogin } = useContext(LoginContext)  
    const [ cart, setCart ] = useState(useContext(CartContext).cart);
    const { name, setName } = useContext(NameContext)
    let total = 0;   
    const {address, setAddress} = useContext(AddressContext);
    let order = ""
    let NumcartItems = Object.getOwnPropertyNames(cart).length-1;         
    const [quantity, setQuantity] = useState(new Array(NumcartItems).fill(1));
    const [UsersCardDetails, setUsersCardDetails ] = useState([]);
    const [UsersAddressDetails, setUsersAddressDetails ] = useState([]);
    const [Cardvalue , setCardvalue] = useState("")
    let canSendEmail = false; //you don't want to  an send email if the countity is zero
    const [move, setMove] = useState(false); 
    const [status, setStatus] = useState(false);
    var today = new Date();

  
    const tracking = ["Preparing Order"];
    const currenttime = [today];


  function onStatus() {
    setStatus(false)
  }

  
  
  useEffect(() => {
     // fetch card setails
    const getCards = async () => {
      const data = await getDocs(collection(db, "CardDetails"));   
      setUsersCardDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getCards();
  }, []);
    
  useEffect(() => { 
      // fetch address details
    const getAddress = async () => {
      const data = await getDocs(collection(db, "Address"));
      setUsersAddressDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getAddress();
  }, []);
    // wait for initialization of both objects
  if (UsersAddressDetails.length != 0 && UsersCardDetails.length !=0) {
       for (let i = 0; i < UsersCardDetails.length; i = i + 1) {
        if(UsersAddressDetails[i].Name ==name){
          setAddress(UsersAddressDetails[i])
          break
        }
    } 
    for (let i = 0; i < UsersCardDetails.length; i = i + 1) {
      if(UsersCardDetails[i].Name ==name){
        setCardNo(UsersCardDetails[i].CardNumber)
        break
      }
    } 
  }









  // update the row(quantity) after a user has purchased
  const UpDateRow = async (item ,index) => {
    //handles adding a review to database
    await setDoc(
      doc(db, "Inventory", item.id),
      {
        Quantity: item.Quantity - quantity[index]    // subtract quantity from local cart item
      },
      { merge: true }
    );

  };
    
  const itemRef = collection(db, "Bought"); 
  
        function update(index) {  //update the quantity of cart items relative to the user  simulataneously in the inventory
          
          
          
          if (cart[index].Quantity != 0) {
                    // don't update quantity(prevents data inconsistancy) 
              UpDateRow(cart[index], index);   
              cart[index].Quantity = quantity[index];     
            }

        
       }

      const addItems = async (Cart) => {           //handles adding an item to database
        await addDoc(itemRef, Object.assign({Buyer:name ,Cart , LocDesc:tracking , Time: currenttime , Date:String(today)}));      
      }
  
  
        function AddtoDatabase() {   // upload bought items to database
        
          let len = NumcartItems;
          for (let i = 0; i < len; i = i + 1){

          if (cart[i].Quantity != 0) {
                  // a buyer can't buy zeros items so don't add to database 
            update(i)
            addItems(cart[i])    
            canSendEmail = true;
            }
        
          }
        }

  function Purchase() {   // a wrapper for the functions called when the user hits purchase button
    setStatus(true);
    setMove(true);

     AddtoDatabase();
     if (canSendEmail) {
       sendemail();  
     }


    


        }
  

    
        function sendemail() {
          var userid = "Uhi73WxfmyePOs3wU"
          emailjs.init(userid);

 
          var details = {
            email: name // user email
                       /* data which will be needed from template may be extracted from here,
                         e.i ( name of user or subject of email)                   */  
          };

          emailjs.send('service_ew7io57', 'template_25ddejk', details).then(function (res) {
              //lert("Your transaction was successful , continue buying");
          },
          reason => {
            alert("Invalid user email or internet connection is low");
          })
    
        }

          
        function onPlus(index) { //increments quantity
          
          let array = [...quantity];
          if (cart[index].Quantity > array[index]) {

            array[index] = array[index] + 1;
            setQuantity(array);
          }
          else {
              alert("maximum number of available items reached")
          }
          };
        function onRemove(index) {
          let tempQuant = [...quantity];
          let tempcart = [...cart];
          tempQuant.splice(index, 1);
          tempcart.splice(index, 1);
          setQuantity(tempQuant);
          setCart(tempcart);
          
        }
          
        

         function onMinus(index) { // decrements quantity           
            let array = [...quantity];
            if (array[index] > 1) {
              array[index] = array[index] - 1;
              setQuantity(array);
            }
                          
        };
        function GetTotal(){
            for (let i = 0; i < cart.length; i++) {
                const element = cart[i];
                total += element.Price;
            }
            total = total.toFixed(2);
          return total
        }

        function totalPrice () {
           let total = 0
            for (let i = 0; i < cart.length; i++) {
                const element = cart[i];
                total += element.Price*quantity[i];
            }
            total = total.toFixed(2);
      
              return ( <>{total}</>);  
        }

        return (
          <div>            
            
            <Navigation />
            <div className = "sumdiv">
              
              <h1 className="h1in">Summary</h1>
              <br />
              <h5>Items</h5>
              {cart.map(function (currentValue , index) {
                return (
                  <div className="cartitemdiv-p" >             
                    <div className="cartleft">
                      <img src={currentValue.Image} className="pic" />
                    </div>
                    <div className="cart-item-name ">
                      <h6 className="cartid">{currentValue.Name}</h6>
                      <h6 className="pricediv">R{currentValue.Price}</h6>
                    </div>
                    <div className="cartright" >
                      <text className="itemquantity">Quantity</text>
                      <div className='btnclick'>
                      <button className="btndecrement" onClick={() => onMinus(index)} >-</button>
                                      {quantity[index]}
                      <button className="btncomplete" onClick={() => onPlus(index)}  >+ </button>                   
                      </div>
                      <button className="btnremove"  onClick={() => onRemove(index)}>
                        <img src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-trash-icon-vector-illustration-in-line-style-for-any-purpose-png-image_4246280.jpg" />                        
                      </button>
                    </div>
                  </div>)
              })}
              <h5 className="h1in">Address</h5>
              <div className="addressdiv">
                <img src="https://www.pngkey.com/png/full/432-4323239_portafolio-house-icon-round.png" />
                <div>
                  <p>{address.Country}</p>
                  <p>{address.Province}</p>
                  <p>{address.City}</p>
                  <p>{address.Street}</p>
                </div>
              </div>
              <h5 className="h1in">Card Details</h5>
              <div className="addressdiv">
                <img src="https://cdn-icons-png.flaticon.com/512/60/60378.png?w=1380&t=st=1651582181~exp=1651582781~hmac=7e16d4933aefb967e8f5585cd86d6926305e5738b2f3c72b58dc93b4c9dc1c1d" />
                <div>
                  <p></p>
                  <p>{cardno}</p>
                  <br/>
                  <br/>
                </div>
              </div>
            </div>
            <div className="totalbar">
              <text className='textin'>R{totalPrice()}</text>             
                < ReactJsAlert
                status={status} // true or false
                type="success" // success, warning, error, info
                title="Yours Transaction was succesful"
                quotes={true}
                color = "#113E21"
                quote="You will receive a confirmation through an email , you may Continue shopping"
                Close={() => onStatus()}
                
                />
                <button className="btncomplete" onClick={() => Purchase()} >
                  Purchase
                </button>

            </div>

        {  move && !status ? <Redirect to="/landing"/>    
        : null }              
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