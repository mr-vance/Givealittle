import React,{useState, useEffect,useRef} from 'react'
import {Navbar} from './Navbar'
import {auth,fs} from '../Config/Config'
import { WishlistProducts } from './WishlistProducts';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { AiOutlineHeart } from "react-icons/ai"
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {Icon} from 'react-icons-kit'
import logo from '../Images/logo.png'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const Wishlist = () => {
    const searchRef = useRef();
    
    // getting current user function
    function GetCurrentUser(){
        const [user, setUser]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    //goes to the fibase firestore and look for the "users" table and collect the relevant info.
                    fs.collection('users').doc(user.uid).get().then(snapshot=>{
                        setUser(snapshot.data().FullName);
                    })
                }
                else{
                    setUser(null);
                }
            })
        },[])
        return user;
    }

    const user = GetCurrentUser();
    // console.log(user);
    
    // state of wishlist products
    const [wishlistProducts, setWishlistProducts]=useState([]);

    // getting wishlist products from firestore collection and updating the state
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Wishlist ' + user.uid).onSnapshot(snapshot=>{
                    const newWishlistProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setWishlistProducts(newWishlistProduct);                    
                })
            }
            else{
                console.log('user is not signed in to retrieve wishlist');
            }
        })
    },[])

    // getting the TotalProductPrice from wishlistProducts in a seperate array
    const price = wishlistProducts.map((wishlistProduct)=>{
        return wishlistProduct.TotalProductPrice;
    })

    // reducing the price in a single value
    const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;

    const totalPrice = price.reduce(reducerOfPrice,0);

    // global variable
    let Product;
    
    // wishlist product increase function
    const wishlistProductIncrease=(wishlistProduct)=>{
        // console.log(wishlistProduct);
        Product=wishlistProduct;
        Product.qty=Product.qty+1;
        Product.TotalProductPrice=Product.qty*Product.price;
        // updating in database
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Wishlist ' + user.uid).doc(wishlistProduct.ID).update(Product).then(()=>{
                    console.log('increment added');
                })
            }
            else{
                console.log('user is not logged in to increment');
            }
        })
    }

    // wishlist product decrease functionality
    const wishlistProductDecrease =(wishlistProduct)=>{
        Product=wishlistProduct;
        if(Product.qty > 1){
            Product.qty=Product.qty-1;
            Product.TotalProductPrice=Product.qty*Product.price;
             // updating in database
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('Wishlist ' + user.uid).doc(wishlistProduct.ID).update(Product).then(()=>{
                        console.log('decrement');
                    })
                }
                else{
                    console.log('user is not logged in to decrement');
                }
            })
        }
    }

     // state of totalProducts
     const [totalProducts, setTotalProducts]=useState(0);
     // getting cart products   
     useEffect(()=>{        
         auth.onAuthStateChanged(user=>{
             if(user){
                 fs.collection('Wishlist ' + user.uid).onSnapshot(snapshot=>{
                     const qty = snapshot.docs.length;
                     setTotalProducts(qty);
                 })
             }
         })       
     },[])
     
     // charging payment
     const history = useHistory();
     const handleToken = async(token)=>{
        //  console.log(token);
        const cart = {name: 'All Products', totalPrice}
        const response = await axios.post('http://localhost:8080/checkout',{
            token,
            cart
        })
        console.log(response);
        let {status}=response.data;
        console.log(status);
        if(status==='success'){
            history.push('/');
            toast.success('Your order has been placed successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              });
              
              const uid = auth.currentUser.uid;
              const carts = await fs.collection('Wishlist ' + uid).get();
              for(var snap of carts.docs){
                  fs.collection('Wishlist ' + uid).doc(snap.id).delete();
              }
        }
        else{
            alert('Something went wrong in checkout');
        }
     }
     //showing the navigation bar in the wishlist 
     function Navbar(){
        const history = useHistory();

        const handleLogout=()=>{
            auth.signOut().then(()=>{
                history.push('/login');
            })
        }

     return (
        //showing the logo of ours on the left side of the navigation bar ,and the cart and the heart icons on the right-side of the
        //navigation bar
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
                    <div><Link className='navlink' to="signup">SIGN UP</Link></div>
                    <div><Link className='navlink' to="login">LOGIN</Link></div>
                </>} 
                
                <input type="text"
              placeholder="Search..."
              ref={searchRef}
            />
            <button className="btnsearch" onClick={() => {
              //setSearchTerm(searchRef.current.value)
            }}>
              {/* <SearchIcon/> */}
              Search
            </button>
            
                {user&&<>
                
                    <div><Link className='navlink' to="/">{user}</Link></div>
            
                    <div className='cart-menu-btn'>
                     {/* shows the cart which is an icon for the cart component */}
                        <Link className='navlink' to="cart">
                            <Icon icon={shoppingCart} size={20}/>
                            
                        </Link>
                       
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

   
    return (
        <>
                     
            <br></br>
            <Navbar />
            {wishlistProducts.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Wishlist</h1>
                    <div className='products-box'>
                        <WishlistProducts wishlistProducts={wishlistProducts}
                            wishlistProductIncrease={wishlistProductIncrease}
                            cartProductDecrease={wishlistProductDecrease}
                        />
                    </div>
                                                       
                </div>
            )}
            {wishlistProducts.length < 1 && (
                <div className='container-fluid'>No products to show</div>
            ) }           
        </>
    )
}