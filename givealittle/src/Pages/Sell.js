import React from "react";
import { useState, useEffect, useContext } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Login.css";
import { NameContext } from "../Context";
import SpecsPage from "./SpecsPage";
import "../components/Categories.css";
import Navigation from "../components/Navigation";
import { motion } from "framer-motion";

export default function Sell({ allTabs, setAllTabs }) {
  const [newName, setNewName] = useState(""); //state for item name
  const [newDescription, setNewDesnewDescription] = useState(""); //state for description
  const [newImg, setnewImg] = useState(""); //state for image
  const [newImg2, setNewImg2] = useState("");
  const [newPrice, setNewPrice] = useState(0); //state for price
  const [newQuantity, setNewQuantity] = useState(0); //state for quantity

  const [item, setItem] = useState([]); //state for item
  const itemRef = collection(db, "Inventory"); //refernce for item
  const { name } = useContext(NameContext); //state for currently signed in user email
  const [Specs, setSpecs] = useState([]); //State for the specs

  const [productCategories, setProductCategories] = useState("");

  //function for when the add button is clicked
  const handleClick = (tabName) => {
    const tempArr = [...allTabs];
    let currentTab = tempArr.find((tab) => tab.tabName == tabName);

    if (!currentTab.active) {
      currentTab.active = true;
    }
    for (let i in tempArr) {
      let loopTab = tempArr[i];
      if (loopTab.tabName != tabName) {
        loopTab.active = false;
      }
    }

    setAllTabs(tempArr);
  };

  //state for the categories the product belongs to
  const [categoriesActivity, setAllCategoriesActivity] = useState([
    {
      categoryName: "All",
      active: true,
    },
    {
      categoryName: "Automotive",
      active: false,
    },
    {
      categoryName: "Baby",
      active: false,
    },
    {
      categoryName: "Beauty & Personal Care",
      active: false,
    },
    {
      categoryName: "Books",
      active: false,
    },
    {
      categoryName: "Cellphones & Wearables",
      active: false,
    },
    {
      categoryName: "Computers & Electronics",
      active: false,
    },
    {
      categoryName: "Gaming",
      active: false,
    },
    {
      categoryName: "Fashion",
      active: false,
    },
    {
      categoryName: "Health & Household",
      active: false,
    },
    {
      categoryName: "Home & Appliances",
      active: false,
    },
    {
      categoryName: "Liquor",
      active: false,
    },
    {
      categoryName: "Office & Stationary",
      active: false,
    },
    {
      categoryName: "Pets",
      active: false,
    },
    {
      categoryName: "Sport & Training",
      active: false,
    },
    {
      categoryName: "Toys",
      active: false,
    },
    {
      categoryName: "TV Audio & Media",
      active: false,
    },
  ]);

  const addItem = async () => {
    //handles adding an item to database
    await addDoc(itemRef, {
      Name: newName,
      Description: newDescription,
      Price: newPrice,
      Quantity: newQuantity,
      Image: newImg,
      Stars: "",
      Review: "",
      ReviewUser: "",
      Seller: name,
      Specs: Specs,
      Categories: productCategories,
    });
    alert("Added");
    handleClick("All Products");
  };

  useEffect(() => {
    //gets data from database
    const getItems = async () => {
      const data = await getDocs(itemRef);
      setItem(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getItems();
  }, []);

  //function for selecting/unselecting categories from product
  const categoryClick = (categoryName) => {
    let categoryData = [...categoriesActivity];
    let categoryActive = categoryData.find(
      (category) => category.categoryName == categoryName
    ).active;

    if (categoryName != "All") {
      if (categoryActive) {
        categoryData.find(
          (category) => category.categoryName == categoryName
        ).active = false;
      } else {
        categoryData.find(
          (category) => category.categoryName == categoryName
        ).active = true;
      }
    }

    setAllCategoriesActivity(categoryData);
  };

  //function for creating the categories string to add to database
  const createCategoriesString = () => {
    let categoriesString = "";
    for (let i in categoriesActivity) {
      if (categoriesActivity[i].active) {
        categoriesString += "," + categoriesActivity[i].categoryName;
      }
    }
    categoriesString = categoriesString.substring(1);
    setProductCategories(categoriesString);
  };

  //useEffect for when the selected categories change
  useEffect(() => {
    createCategoriesString();
  }, [categoriesActivity]);

  return (
    <div className="bigdiv">
      <div className="logindivb">
        {" "}
        {/*form for item information*/}
        <input
          className="edtname"
          id="input"
          placeholder="Item Name"
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <br />
        <input
          className="edtdesc"
          id="input"
          placeholder="Item Description"
          onChange={(event) => {
            setNewDesnewDescription(event.target.value);
          }}
        />
        <br />
        <input
          className="edtimg"
          id="input"
          placeholder="Image Link"
          onChange={(event) => {
            setnewImg(event.target.value);
          }}
        />
        <br />
        <input
          className="edtprice"
          type="number"
          id="input"
          placeholder="Item Price"
          min="19.99"
          onChange={(event) => {
            let t = parseFloat(event.target.value);
            setNewPrice(t);
          }}
        />
        <br />
        <input
          type="number"
          className="edtquant"
          id="input"
          placeholder="Quantity"
          min="1"
          max="100"
          onChange={(event) => {
            let t = parseInt(event.target.value);
            setNewQuantity(t);
          }}
        />
        <br />
        <h4 style={{ marginTop: "30px" }}>Add Product Specifications</h4>
        <SpecsPage Specs={Specs} setSpecs={setSpecs} />
        {/** Code below allows the seller to select product categories
         * Every product belongs to the "All" category by default
         * Every other category can be dynamically selected
         */}
        <h4 style={{ marginTop: "30px" }}>Select product Categories</h4>
        <div>
          <div
            className="categories-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "150px",
              marginRight: "150px",
            }}
          >
            {categoriesActivity.map((category, index) => {
              return (
                <div key={index}>
                  <button
                    className="category"
                    style={{
                      backgroundColor: category.active ? "#9ccc64" : "#E8E1D6",
                    }}
                    onClick={() => categoryClick(category.categoryName)}
                  >
                    {category.categoryName}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <button className="btnadd" id="btn" onClick={addItem}>
          Add
        </button>
      </div>
    </div>
  );
}

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      exit={({ opacity: 0 }, { duration: 0.5 })}
      className="navbar"
    >
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
    </motion.div>
  );
}
