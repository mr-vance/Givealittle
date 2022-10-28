import React,{useState, useEffect, useRef} from 'react'
//import { Navbar } from './Navbar'
import { Products } from './Products'
import {auth,fs} from '../Config/Config'
import {Link} from 'react-router-dom'
import logo from '../Images/logo.png'
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {useHistory} from 'react-router-dom'
import { AiOutlineHeart } from "react-icons/ai"


export const Home = (props) => {

    const [show, setShow] = useState(false);            //state for showing cart
    const [text, setText] = useState("");  

     // state of products
     const [products, setProducts]=useState([]);

   
    const searchRef = useRef();
    
    const [searchTerm, setSearchTerm] = useState("");

<<<<<<< HEAD
=======

// Category code-----------------------------------------------------------------------------------------------------------

const [searchedProducts, setSearchedProducts] = useState([]);
const [suggestionDropdown, setSuggestionDropdown] = useState(true);
//state for collapsing the filter by category
 const [isFilter, setIsFilter] = useState(false);
 const handleFilter = () => {
     if (isFilter){
         setIsFilter(false);
     }else{
         setIsFilter(true)
     }
 }
 
 const allCategories = ["All","Automotive", "Baby", "Beauty & Personal Care", "Books", "Cellphones & Wearables", "Computers & Electronics", "Gaming", "Fashion", "Health & Household", "Home & Appliances", "Liquor", "Office & Stationary", "Pets", "Sport & Training", "Toys", "TV Audio & Media"]

 //State for the currently selected category
 const [categoriesActivity, setAllCategoriesActivity] = useState([
     {
         categoryName: "All",
         active: true,
         products: []
     },
     {
         categoryName: "Automotive",
         active: false,
         products: []
     },
     {
         categoryName: "Baby",
         active: false,
         products: []
     },
     {
         categoryName: "Beauty & Personal Care",
         active: false,
         products: []
     },
     {
         categoryName: "Books",
         active: false,
         products: []
     },
     {
         categoryName: "Cellphones & Wearables",
         active: false,
         products: []
     },
     {
         categoryName: "Computers & Electronics",
         active: false,
         products: []
     },
     {
         categoryName: "Gaming",
         active: false,
         products: []
     },
     {
         categoryName: "Fashion",
         active: false,
         products: []
     },
     {
         categoryName: "Health & Household",
         active: false,
         products: []
     },
     {
         categoryName: "Home & Appliances",
         active: false,
         products: []
     },
     {
         categoryName: "Liquor",
         active: false,
         products: []
     },
     {
         categoryName: "Office & Stationary",
         active: false,
         products: []
     },
     {
         categoryName: "Pets",
         active: false,
         products: []
     },
     {
         categoryName: "Sport & Training",
         active: false,
         products: []
     },
     {
         categoryName: "Toys",
         active: false,
         products: []
     },
     {
         categoryName: "TV Audio & Media",
         active: false,
         products: []
     }
 ])


 //currently active search category
 const [searchActiveCategory, setSearchActiveCategory] = useState([{
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
 }])

 const [currentSearchCategory, setCurrentSearchCategory] = useState(searchActiveCategory.find(category => category.active).categoryName);
 
 //handle user typing in search box
 const handleSearchTermChange = (event) => {
     setSearchTerm(event.target.value);
   }

 //function to search for an item in a given category
 const searchCategory = (categoryName) => {
     let category = categoriesActivity.find(category => category.categoryName == categoryName).products;
     let tempArr = [];
     for (let i in category){
         let stringToSearch = category[i].Name.toLowerCase().replace(/\s/g, '')
         
         if (stringToSearch.includes(searchTerm.toLowerCase().replace(/\s/g, ''))){
             tempArr = [...tempArr, category[i]]
             setSearchedProducts([...tempArr]);
         }
        }
      }
        //useEffect for when the category selection changes
    useEffect(() => {
      if (searchTerm != ""){
          searchCategory(currentSearchCategory)
      }
  }, [currentSearchCategory])

  useEffect(() => {
      searchCategory(currentSearchCategory)
  },[searchTerm])

  //used to show the category search dropdown menu
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  const handleDropdown = () => {
      if (categoryDropdown){
          setCategoryDropdown(false);
      }else {
          setCategoryDropdown(true);
      }

  }

  //function to split the string of categories by ,
  const splitCategories = (categoriesString) => {
      const categoriesArray = categoriesString.split(",");
      return categoriesArray
  }

  const [currentActiveCategory, setCurrentActiveCategory] = useState("All")
  //useEffect for the currenctly selected category
  useEffect(() => {
      setCurrentActiveCategory(categoriesActivity.find(category => category.active).categoryName)
  },[categoriesActivity])

  //useEffect for setting up the categories
  useEffect(() => {
      let tempArr = [...categoriesActivity]
      for (let x in allCategories){
          let currentCategory = allCategories[x]
          for (let i in products){
              let productCategories = splitCategories(products[i].Categories)
              if(productCategories.includes(currentCategory)){
                  let theCategory = tempArr.find(category => category.categoryName == currentCategory)
                  theCategory.products.push(products[i])
              }
          }
      }
      setAllCategoriesActivity([...tempArr])        
  },[products])



//-----------------------------------------------------------------------------------------------------------------------------------


    



    function StarRAting(){
      return(
        <div className='App'>
              <StarRating />
          </div>
      )
    }


>>>>>>> 13b3c34e8d4b6b2a8845627dec2b5847da062adc
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

                        <div className='drop-down-container'>
                            <button className='search-category-button' onClick={handleDropdown}>
                                {currentSearchCategory}
                            </button>
                                {categoryDropdown ? 
                                    <CategorySearchDropdown 
                                        searchActiveCategory={searchActiveCategory} 
                                        setSearchActiveCategory={setSearchActiveCategory} 
                                        currentSearchCategory={currentSearchCategory} 
                                        setCurrentSearchCategory={setCurrentSearchCategory} 
                                        setCategoryDropdown={setCategoryDropdown}/>
                                    : null
                                }
                        </div>


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
                                <Icon icon={shoppingCart} size={20}/>
                            </Link>
                            <span className='cart-indicator'>{totalProducts}</span>
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
              <button className="cart-btn" onClick={() => setShow(false)}>Close</button>
    
              <div>
                <img style={{ boxShadow: "0px 0px 10px 0px rgb(200, 200, 200)" }} src={item.url} />
              </div>
             
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <h1 className="product-view-price">R{item.price}</h1>
              <div>
                <input type="number" className="edtnum" placeholder="1" min='0' max={item.Quantity} />
                <button className="cart-btn" onClick={() => addToCart(item)}>Add to cart</button>
                <button className="cart-btn" onClick={() => addToWishlist(item)}>Add to wishlist</button>
              </div>
    
            </div>
          </div>
        )
      }


    



      return (
        <div>
<<<<<<< HEAD
=======

        <Navbar />
        <SearchSuggestion 
            searchedProducts={searchedProducts} 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            suggestionDropdown={suggestionDropdown}
            setSuggestionDropdown={setSuggestionDropdown}/>
        <input className='edtsearch' placeholder='Search' type="text" value={searchTerm} onChange={handleSearchTermChange}></input>

        {isFilter ? 
        
        <button className='filter' style={{backgroundColor: "#9ccc64"}} onClick={handleFilter}>Close Filter</button>
        :
        <button className='filter' onClick={handleFilter}>
        Filter by Category
        </button>
    }

        {isFilter ? 
            <CategorySelector 
            categoriesActivity={categoriesActivity} 
            setAllCategoriesActivity={setAllCategoriesActivity}
            setCategoryDropdown={setCategoryDropdown}/>
            :null
        }
        


        {searchedProducts.length != 0 && searchTerm != "" ?
            <div>
                {searchTerm != "" ?
                    <h6 className='category-search-heading'>({searchedProducts.length}) Results for "{searchTerm}" in <span className='search-result-category'>{currentSearchCategory}</span></h6>
                    : null
                }
                <div className='bodydiv'>
            {searchedProducts.map((item, itemIndex) => {
                return (
                    <div key={itemIndex} className="itemdiv" onClick={() => {
                        ProductView(item)
                    }}>
                        <img src={item.Image} alt="nope" />
                        <div className="textdiv">
                            <h1 className="itemname">{item.Name}</h1>
                        </div>
                        <h1 className="itemprice">R{item.Price}</h1>
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
                )
            })}
            </div>
            </div>
            : null
        }
        
            

        {   currentActiveCategory != "All" ? 
            <div>
                <h6 className='category-heading'>{currentActiveCategory + " (" + categoriesActivity.find(category => category.categoryName == currentActiveCategory).products.length + ")"}</h6>

            <div className='bodydiv'>
            {categoriesActivity.find(category => category.categoryName == currentActiveCategory).products.map((item, itemIndex) => {
                return (
                    <div key={itemIndex} className="itemdiv" onClick={() => {
                        ProductView(item)
                    }}>
                        <img src={item.Image} alt="nope" />
                        <div className="textdiv">
                            <h1 className="itemname">{item.Name}</h1>
                        </div>
                        <h1 className="itemprice">R{item.Price}</h1>
                
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
                )
            })}
            </div>
            </div>
            :null
        }
        


        <h6 className='category-heading'>All products{" (" + categoriesActivity.find(category => category.categoryName == "All").products.length + ")"}</h6>
        {

          
          
>>>>>>> 13b3c34e8d4b6b2a8845627dec2b5847da062adc
          <Navbar />
          {
<<<<<<< HEAD
=======
            

>>>>>>> 13b3c34e8d4b6b2a8845627dec2b5847da062adc
            show ? <div className="reviewdiv">
                {text}
            </div> :

                <div className="bodydiv" >
                    {products.map((item, indx) => {
                        return (
                        <div key={indx} className="itemdiv" onClick={() => {
                            ProductView(item)
                        }}>
                            <img src={item.url} alt="nope" />
                            <div className="textdiv">
                                <h1 className="itemname">{item.title}</h1>
                            </div>
                            <h1 className="itemprice">R{item.Price}</h1>
            
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
                        )
                    })}
                </div>
        }

    </div>
);

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