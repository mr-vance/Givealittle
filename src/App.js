import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home } from './Components/Home'
import { Login } from './Components/Login'
import { Signup } from './Components/Signup'
import { NotFound } from './Components/NotFound'
import { AddProducts } from './Components/AddProducts'
import { Cart } from './Components/Cart'
import { Wishlist } from './Components/Wishlist'


export const App = () => {
  return (

    <BrowserRouter>
      <Switch>
         {/* route to the home page */}
        <Route exact path="/" component = {Home}/>
        {/* route to the signup page */}
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <Route path="/add-products" component={AddProducts}/>
        <Route path="/cart" component={Cart}/>  
        <Route path="/wishlist" component={Wishlist}/>  

        <Route component={NotFound}/>        
      </Switch>
    </BrowserRouter>

  );
}

export default App
