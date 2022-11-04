import React,{useState, useRef, useEffect} from 'react'
import {Link} from 'react-router-dom'
import logo from '../Images/logo.png'
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {auth} from '../Config/Config'
import {useHistory} from 'react-router-dom'
import { AiOutlineHeart } from "react-icons/ai"

export const Navbar = ({user,totalProducts}) => {

    const history = useHistory();

    const handleLogout=()=>{
        auth.signOut().then(()=>{
            history.push('/login');
        })
    }

    const searchRef = useRef();

    const [searchTerm, setSearchTerm] = useState("");
//Navigation bar
    return (
        <div className='navbar'>
            <div className='leftside'>
                <div className='logo'>
                    <Link to="/">
                        <img src={logo} alt="logo"/>
                     </Link>
                </div>
            </div>
            <div className='rightside'>
        
                {!user&&<>
                    {/* link to the sign up page */}
                    <div><Link className='navlink' to="signup">SIGN UP</Link></div>
                    {/* link to the login page */}
                    <div><Link className='navlink' to="login">LOGIN</Link></div>
                </>} 
                
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

                {user&&<>
                    <div><Link className='navlink' to="/">{user}</Link></div>
                    <div className='cart-menu-btn'>
                        <Link className='navlink' to="cart">
                             {/* shows the cart which is an icon for the cart component */}
                            <Icon icon={shoppingCart} size={20}/>
                        </Link>
                        <span className='cart-indicator'>{totalProducts}</span>
                    </div>

                    <div className='cart-menu-btn'>
                        <Link className='navlink' to="wishlist">
                               {/* shows the heart which is an icon for the wishlist component */}
                                        <AiOutlineHeart size={25}/>
                        </Link>
                        
                    </div>
                     {/* shows the logout button in the nav bar */}
                    <div className='btn btn-danger btn-md'
                    onClick={handleLogout}>LOGOUT</div>
                </>}                     
                                
            </div>
        </div>

    )

    


}
