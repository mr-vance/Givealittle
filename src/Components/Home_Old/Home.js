import React,{useState, useEffect, useRef, lazy} from 'react'
import { Products } from './Products'
import {auth,fs} from '../Config/Config'
import {Link} from 'react-router-dom'
import logo from '../Images/logo.png'
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {useHistory} from 'react-router-dom'
import { AiOutlineHeart } from "react-icons/ai"
import BootstrapCarousel from './BootstrapCarousel'
import "./App.css";
import StarRating from './StarRating'


export const Home = (props) => {

    const [show, setShow] = useState(false);            //state for showing cart
    const [text, setText] = useState("");  

   
    const searchRef = useRef();
    
    const [searchTerm, setSearchTerm] = useState("");


    function StarRAting(){
      return(
        <div className='App'>
              <StarRating />
          </div>
      )
    }

    function Navbar(){
        const history = useHistory();

        const handleLogout=()=>{
            auth.signOut().then(()=>{
                history.push('/login');
            })
        }
    
       
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
                    
                        <div><Link className='navlink' to="signup">SIGN UP</Link></div>
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

                      <div className='centerside'>
                  <div><Link className='navlink' to="/add-products" style={{color: 'white'}} >Are you a seller?</Link></div>
                </div>
                    
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


   
    
    // getting current user uid
    function GetUserUid(){
        const [uid, setUid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return uid;
    }

    const uid = GetUserUid();

    // getting current user function
    function GetCurrentUser(){
        const [user, setUser]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
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
    
    // state of products
    const [products, setProducts]=useState([]);

    // getting products function
    const getProducts = async ()=>{
        const products = await fs.collection('Products').get();
        const productsArray = [];
        for (var snap of products.docs){
            var data = snap.data();
            data.ID = snap.id;
            productsArray.push({
                ...data
            })
            if(productsArray.length === products.docs.length){
                setProducts(productsArray);
            }
        }
    }

    useEffect(()=>{
        getProducts();
    },[])

    // state of totalProducts
    const [totalProducts, setTotalProducts]=useState(0);
    // getting cart products   
    useEffect(()=>{        
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })       
    },[])  

    

    // globl variable
    let Product;

    // add to cart
    const addToCart = (product)=>{
        if(uid!==null){
            // console.log(product);
            Product=product;
            Product['qty']=1;
            Product['TotalProductPrice']=Product.qty*Product.price;
            fs.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=>{
                console.log('successfully added to cart');
            })

        }
        else{
            props.history.push('/login');
        }
        
    }

    const addToWishlist = (product)=>{
      if(uid!==null){
          // console.log(product);
          Product=product;
          Product['qty']=1;
          Product['TotalProductPrice']=Product.qty*Product.price;
          fs.collection('Wishlist ' + uid).doc(product.ID).set(Product).then(()=>{
              console.log('successfully added to wishlist');
          })

      }
      else{
          props.history.push('/login');
      }
      
  }


    function ProductView(item) {     //handles the viewing of a product in isolation
        setShow(true)
    
        setText(
          <div>
    
            <div className="item-container">
              <button className='btn btn-danger btn-md' onClick={() => setShow(false)}>Close</button>
    
              <div>
                <img style={{ boxShadow: "0px 0px 10px 0px rgb(200, 200, 200)" }} src={item.url} />
              </div>
             
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <h1 className="product-view-price">R{item.price}</h1>
              <div>
                <input type="number" className="edtnum" placeholder="1" min='0' max={item.Quantity} />
                <button className='btn btn-danger btn-md' onClick={() => addToCart(item)}>Add to cart</button>
                <button className='btn btn-danger btn-md' onClick={() => addToWishlist(item)}>Add to wishlist</button>
                
              </div>
    
            </div>
          </div>
        )
      }


    



      return (
        
        <div>
          
          
          <Navbar />
          <BootstrapCarousel />
          
          {
            
            show ? <div className="reviewdiv">
              {text}
            </div> :
              <div className="bodydiv" >
                {products.filter((item) => {
                  if (searchTerm == "") {
                    return item
                  } else if (item.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
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
