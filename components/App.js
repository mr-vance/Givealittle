//import logo from './logo.svg';
import React from "react";
import Signup from "./Signup";
import { Container } from 'react-bootstrap';
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";
import Login from './Login';
import DriverLogin from './DriverLogin';
import DriverSignup from './DriverSignup';
import DriverDashboard from "./DriverDashboard";
import ForgotPassword from "./ForgotPassword";

function App() {
  return (
    <AuthProvider>
    <Container className="d-flex align-items-center
    justify-content-center"
    style={{ minHeight: '100vh'}}
    >
      <div className="w-100" style={{ maxWidth: '400px'}}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path='/signup' element={<Signup/>} />
              <Route path='/dashboard' element={<Dashboard/>} />
              <Route path='/' element={<Login/>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
              <Route path='/driverlogin' element={<DriverLogin/>} />
              <Route path='/driversignup' element={<DriverSignup/>} />
              <Route path='/driverdashboard' element={<DriverDashboard/>} />

            </Routes>
          </AuthProvider>
        </Router>
       
      </div>
       
    </Container>
    </AuthProvider>

   
  )
}

export default App;
