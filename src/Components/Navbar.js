import React,{useState, useRef, useEffect} from 'react'
import {Link} from 'react-router-dom'
import logo from '../Images/logo.png'
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {auth} from '../Config/Config'
import {useHistory} from 'react-router-dom'
import { AiOutlineHeart } from "react-icons/ai"
import Button from 'react-bootstrap/Button';

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
        <div className='navbar' style={{marginTop:-25}} >
            <div className='leftside'>
                <div className='logo'>
                    <Link to="/">
                        <img src={logo} alt="logo"/>
                     </Link>
                </div>
            </div>
            <div className='rightside'>

                {!user&&<>
                    <div><Link className='navlink' to="signup">SIGN UP</Link></div>
                    <div><Link className='navlink' to="login">LOGIN</Link></div>
                </>} 
                
                <input type="text"
                  placeholder="SEARCH" style={{height:39, borderRadius:7, textAlign:"center", marginRight:10}}
                  ref={searchRef}
                />
            <Button variant='secondary' onClick={() => {
              setSearchTerm(searchRef.current.value)
            }}>
              {/* <SearchIcon/> */}
              Search
            </Button>

                {user&&<>
                    <div><Link className='navlink' to="/">{user}</Link></div>
                    <div className='cart-menu-btn'>
                        <Link className='navlink' to="cart">
                            <Icon icon={shoppingCart} size={20}/>
                        </Link>
                        <span className='cart-indicator'>{totalProducts}</span>
                    </div>

                    <div className='cart-menu-btn'>
                        <Link className='navlink' to="wishlist">
                               
                                        <AiOutlineHeart size={25}/>
                        </Link>
                        
                    </div>

                    <div className='btn btn-danger btn-md'
                    onClick={handleLogout}>LOGOUT</div>
                </>}                     
                                
            </div>
        </div>

    )

    


}
