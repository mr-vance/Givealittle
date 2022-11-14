//All pages imported to this folder
import SpecsPage from "./Pages/SpecsPage";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Landing from "./Pages/Landing";
import SellersLanding from "./Pages/SellersLanding";
import Sell from "./Pages/Sell";
import Sold from "./Pages/Sold";
import Track from "./Pages/Track";
import MakeTransactionAddress from "./Pages/MakeTransactionAddress";
import MakeTransactionPayment from "./Pages/MakeTransactionPayment";
import Payment from "./Pages/Payment";
import About from "./Pages/About";
import Review from "./Pages/Review";
import HomeAbout from "./Pages/HomeAbout";
import HomeContact from "./Pages/HomeContact";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  NameContext,
  LoginContext,
  CartContext,
  CarddetailsContext,
  AddressContext,
  isEligibleContext,
  CurrentUserContext,
} from "./Context"; //imports all global contexts in here where they will be initialized
import { useState, useLocation } from "react";
import Profile from "./Pages/Profile";
import Contact from "./Pages/Contact";
import { AnimatePresence } from "framer-motion";

function App() {
  const [User, setUser] = useState({}); //global context for name of client

  const [name, setName] = useState(""); //global context for name of client

  const [login, setLogin] = useState(false); //global context for knowing if someone is logged in

  const [cart, setCart] = useState(""); //global context for a persons cart

  const [cardno, setCardNo] = useState(""); //global context for card details

  const [address, setAddress] = useState(""); //global context for address

  const [isEligible, setIsEligible] = useState(""); //global context for address

  //const location = useLocation(); // location hook for page transition

  return (
    <AnimatePresence>
      <CurrentUserContext.Provider value={{ User, setUser }}>
        <isEligibleContext.Provider value={{ isEligible, setIsEligible }}>
          <AddressContext.Provider value={{ address, setAddress }}>
            <CartContext.Provider value={{ cart, setCart }}>
              {" "}
              {/*provider for global cart*/}
              <LoginContext.Provider value={{ login, setLogin }}>
                {" "}
                {/*provider for global login checker*/}
                <NameContext.Provider value={{ name, setName }}>
                  {" "}
                  {/*provider for global name*/}
                  <CarddetailsContext.Provider value={{ cardno, setCardNo }}>
                    <Router>
                      {" "}
                      {/*stores all the routes to all pages*/}
                      <Switch>
                        {" "}
                        {/*allows for different routes*/}
                        <Route exact path="/">
                          {" "}
                          {/*route to home page*/}
                          <Home />
                        </Route>
                        <Route path="/login">
                          {" "}
                          {/*route to login page*/}
                          <Login />
                        </Route>
                        <Route path="/review">
                          {" "}
                          {/*route to signup page*/}
                          <Review />
                        </Route>
                        <Route path="/signup">
                          {" "}
                          {/*route to signup page*/}
                          <Signup />
                        </Route>
                        <Route path="/sold">
                          {" "}
                          {/*route to about page*/}
                          <Sold />
                        </Route>
                        <Route path="/landing">
                          {" "}
                          {/*route to landing page*/}
                          <Landing />
                        </Route>
                        <Route path="/sellerslanding">
                          {" "}
                          {/*route to sellers landing page*/}
                          <SellersLanding />
                        </Route>
                        <Route path="/sell">
                          {" "}
                          {/*route to sell page*/}
                          <Sell />
                        </Route>
                        <Route path="/about">
                          {" "}
                          {/*route to about page*/}
                          <About />
                        </Route>
                        <Route path="/track">
                          {" "}
                          {/*route to track page*/}
                          <Track />
                        </Route>
                        <Route path="/maketransactionaddress">
                          {" "}
                          {/*route to maketransaction page*/}
                          <MakeTransactionAddress />
                        </Route>
                        <Route path="/maketransactionpayment">
                          {" "}
                          {/*route to maketransaction page*/}
                          <MakeTransactionPayment />
                        </Route>
                        <Route path="/payment">
                          {" "}
                          {/*route to payment page*/}
                          <Payment />
                        </Route>
                        <Route path="/profile">
                          {" "}
                          {/*route to profile page*/}
                          <Profile />
                        </Route>
                        <Route path="/contact">
                          {" "}
                          {/*route to contact page*/}
                          <Contact />
                        </Route>
                        <Route path="/homeabout">
                          <HomeAbout />
                        </Route>
                        <Route path="/homecontact">
                          <HomeContact />
                        </Route>
                      </Switch>
                    </Router>
                  </CarddetailsContext.Provider>
                </NameContext.Provider>
              </LoginContext.Provider>
            </CartContext.Provider>
          </AddressContext.Provider>
        </isEligibleContext.Provider>
      </CurrentUserContext.Provider>
    </AnimatePresence>
  );
}

export default App;
