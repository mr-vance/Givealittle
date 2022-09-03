import React, { useContext, useRef } from "react";
import { useState, useEffect } from 'react';
import { db } from '../Config/Config';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';


export default function Home() {
  const [cartitems, setCartItems] = useState([])      //state for local cart array
  const [show, setShow] = useState(false);            //state for showing cart
  const [text, setText] = useState("");                //state for product text
  const [Products, setItems] = useState([]);           //state for inventory
  const itemRef = collection(db, "Products");            //reference to inventory in database

  const [Users, setUsers] = useState([]);



  const searchRef = useRef();

  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(collection(db, "users"));
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getUsers()
  }, []);


  function Navbar() {         //function for navbar component
    const [total, setTotal] = useState(0);         //state for cart total
    const [showLinks, setShowLinks] = useState(false);          //state for showing links
    const [showcart, setShowCart] = useState(false);            //state for showing cart
    const [summary, setSummary] = useState("")              //state for cart summary
    let t = 0           //total = 0


    let sum = 0

     
    return (
      <div>
        <div className="navbar">
          <div className="leftside">
            <div className="links" id={showLinks ? "hidden" : ""}>
              <Link className="navlink" to='/sell'>
                <p>Sell</p>
              </Link>
              <Link className="navlink" to='/about'>
                <p>About</p>
              </Link>
              <Link className="navlink" to='/contact'>
                <p>Contact</p>
              </Link>
             
            </div>
            <button onClick={() => setShowLinks(!showLinks)} className="btnthings">
              ≡
            </button>
          </div>
          <div className="rightside">
            <input type="text"
              placeholder="Search..."
              ref={searchRef}
            />
            <button className="btnsearch" onClick={() => {
              setSearchTerm(searchRef.current.value)
            }}>
              {/* <SearchIcon/> */}
              Search
            </button>
          </div>

        </div>
        

      </div>

    )
  }





  useEffect(() => {       //loads data from database
    const getItems = async () => {
      const data = await getDocs(itemRef);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getItems()
  }, []);



  function ProductView(item) {     //handles the viewing of a product in isolation
    setShow(true)
    //const [Users, setUsers] = useState([]);

    setText(
      <div>

        <div className="item-container">
          <button className="btnclose" onClick={() => setShow(false)}>Close</button>

          <div>
            <img style={{ boxShadow: "0px 0px 10px 0px rgb(200, 200, 200)" }} src={item.url} />
          </div>
          {Users.map((user, idx) => (
            user.Email == item.Seller
              ? (
                <p>Sold By : {user.FullName}</p>
              )
              : null
          ))}
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <h1 className="product-view-price">R{item.price}</h1>
          <div>
            <input type="number" className="edtnum" placeholder="1" min='0' max={item.Quantity} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      {
        show ? <div className="reviewdiv">
          {text}
        </div> :
          <div className="bodydiv" >
            {Products.filter((item) => {
              if (searchTerm == "") {
                return item
              } else if (item.Name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                return item
              }
            }).map((item) => {
              return <div className="itemdiv" onClick={() => {
                ProductView(item)
              }}>
                <img src={item.url} alt="nope" />
                <div className="textdiv">
                  <h1 className="itemname">{item.title}</h1>
                </div>
                <h1 className="itemprice">R{item.price}</h1>
                {(() => {
                  if (item.Quantity == 0) {
                    return (
                      <h1 style={{ fontWeight: "bold", color: "#B38B59" }} className="item-quantity">sold out</h1>
                    )
                  } else {
                    return (
                      <h1 className="item-quantity">in stock</h1>
                    )
                  }
                })()}
              </div>
            })}
          </div>
      }

    </div>
  );

}
