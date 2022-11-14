import React from "react";
import ProductInsightsCard from "../components/ProductInsightsCard";
import "../components/SellersPage.css";
import firebase from "../firebase-config";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import "bootstrap/dist/css/bootstrap.min.css";
import SellerDetails from "../components/SellerDetails";
import Sell from "../Pages/Sell";
import Insights from "../components/Insights";
import { motion } from "framer-motion";

import { QuerySnapshot } from "firebase/firestore";

import HomeIcon from "@mui/icons-material/Home";

// To get current user imports
import { NameContext } from "../Context";
import Navigation from "../components/Navigation";
import SellersTabs from "../components/SellersTabs";

function SellersLanding() {
  const [currentUser, setCurrentUser] = useState();
  const { name, setName } = useContext(NameContext);
  const [Users, setUsers] = useState([]);
  const [Inventory, setItems] = useState([]); //state for inventory
  const itemRef = collection(db, "Inventory"); //reference to inventory in database
  const itemhRef = collection(db, "Bought");
  const [Bought, setBItems] = useState([]);
  const [topCustomer, setTopCustomer] = useState('');
  const [totalSale, setTotalSale] = useState('');
  const [topProduct, setTopProduct] = useState('');
  const [getData, setGetData] = useState(false);
  const [custDict, setCustDict] = useState('');
  const [prodDict, setProdDict] = useState('');
  const [pData, setPData] = useState([]);
  const [histData, setHistData] = useState([]);
  const [totMonAverage, setTotMonAverage] = useState(0)


  useEffect(() => {
    //loads data from database
    const getBItems = async () => {
      const data = await getDocs(itemhRef);
      setBItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBItems();
  }, []);

  useEffect(() => {
    function getObjKey(obj, value) {
      return Object.keys(obj).find(key => obj[key] === value);
    }
    let dict = {};
    let max = 0;
    Bought.map((item) =>
    (item.Cart.Seller === name ?
      (item.Buyer in dict ? dict[item.Buyer] += 1 : dict[item.Buyer] = 1) : null) 
    )
    for (const [key, value] of Object.entries(dict)){
      if (value > max){
        max = value
      }
    }

    let dict2 = {};
    let max2 = 0;
    Bought.map((item) =>
    (item.Cart.Seller === name ?
      (item.Cart.Name in dict2 ? dict2[item.Cart.Name] += item.Cart.Quantity : dict2[item.Cart.Name] = item.Cart.Quantity) : null)
    )

    for (const [key, value] of Object.entries(dict2)) {
      if (value > max2) {
        max2 = value
      }
    }
    setCustDict(dict);
    setTopCustomer(getObjKey(dict, max));
    setProdDict(dict2); 
    setTopProduct(getObjKey(dict2, max2));
    let total = 0;
    Bought.map((item) =>
    (item.Cart.Seller === name ?
      total += item.Cart.Price * item.Cart.Quantity : null)
    )
    setTotalSale(Math.round(total * 100) / 100);
    
    let dict3={}
    Bought.map((item) =>
    (item.Cart.Seller === name ?
      (item.Cart.Name in dict3 ? dict3[item.Cart.Name] += item.Cart.Quantity*item.Cart.Price : dict3[item.Cart.Name] = item.Cart.Quantity* item.Cart.Price) : null)
    )
    let datArr=[]
    for (const [key, value] of Object.entries(dict3)) {
      datArr.push({x: value, y: (value) * 100, label: `${key} - R${value}`});
    }

    if (datArr.length > 0) {
      setPData(datArr)
    } else {
      setPData([{x : 0, y : 0,label : 0}])
    }
    

    let dict4 = {}
    Bought.map((item) =>
    (item.Cart.Seller === name ?
      (item.Cart.Date.slice(4, 7) in dict4 ? dict4[item.Cart.Date.slice(4, 7)] += item.Cart.Quantity * item.Cart.Price : dict4[item.Cart.Date.slice(4, 7)] = item.Cart.Quantity * item.Cart.Price) : null)
    )
    let datArr2 = []
    let monave =0
    for (const [key, value] of Object.entries(dict4)) {
      datArr2.push({ x: key, y: value, label: 'R'+Math.round(value * 100) / 100 });
      monave += value
    }
    monave /=datArr2.length
    setTotMonAverage(Math.round(monave * 100) / 100)

    if (datArr2.length > 0) {
      setHistData(datArr2)
    } else {
      setHistData([{ x: 0, y: 0, label: 0 }])
    }
  }, [getData]);



  useEffect(() => {
    //loads data from database
    const getItems = async () => {
      const data = await getDocs(itemRef);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    

    getItems();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(collection(db, "Users"));
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  //State for currently selected tab
  const [allTabs, setAllTabs] = useState([
    {
      tabName: "Add Product",
      active: false,
    },
    {
      tabName: "All Products",
      active: true,
    },
    {
      tabName: "Product Insights",
      active: false,
    },
  ]);

  //currently sellected tab
  const [currentTab, setCurrentTab] = useState(
    allTabs.find((tab) => tab.active).tabName
  );

  //useEffect for when a tab is clicked
  useEffect(() => {
    setCurrentTab(allTabs.find((tab) => tab.active).tabName);
    console.log(currentTab);
  }, [allTabs]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      exit={({ opacity: 0 }, { duration: 0.5 })}
      className="body"
    >
      <Navigation />

      <SellersTabs allTabs={allTabs} setAllTabs={setAllTabs} getData={getData} setGetData={setGetData}/>

      {currentTab == "All Products" ? (
        <div className="products-container">
          <ul>
            {Inventory.map((product, index) =>
              product.Seller == name ? (
                <ProductInsightsCard
                  key={product.Name}
                  image={product.Image}
                  name={product.Name}
                  description={product.Description}
                  price={product.Price}
                  quantity={product.Quantity}
                  specs={product.Specs}
                  productId={product.id}
                  Inventory={Inventory}
                  setItems={setItems}
                  stars={product.Stars}
                  review={product.Review}
                  categories={product.Categories}
                />
              ) : null
            )}
          </ul>
        </div>
      ) : null}

      {currentTab == "Add Product" ? (
        <Sell allTabs={allTabs} setAllTabs={setAllTabs} />
      ) : null}

      {currentTab == "Product Insights" ? (
          <Insights 
          key ={name}
          topCustomer = {topCustomer}
          topProduct = {topProduct}
          totalSale = {totalSale}
          custDict = {custDict}
          prodDict = {prodDict}
          pData = {pData}
          histData = {histData}
          monAve={totMonAverage}/>
      ) : null}
    </motion.div>
  );
}

export default SellersLanding;
