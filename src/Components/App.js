import React from "react"
import Signup from "./Signup"
//import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import {Home} from "./Home"
import Login from "./Login"
import {Navbar} from "./Navbar"
import { Products }from "./Products"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import DriverLogin from "./DriverLogin"
import DriverSignup from "./DriverSignup"
import Dashboard from "./Dashboard"
import {Cart} from "./Cart"
import {NotFound} from "./NotFound"


function App() {
  return (
    
      
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/driverlogin" component={DriverLogin} />
              <Route path="/driversignup" component={DriverSignup} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/cart" component={Cart} />
              <Route path="/navbar" component={Navbar} />
              <Route path="/products" component={Products} />
              <Route component={NotFound}/>

            </Switch>
          </AuthProvider>
        </Router>
      
   
  )
}

export default App