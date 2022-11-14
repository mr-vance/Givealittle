import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./Home.css";
import { CartContext } from "../Context";
import { BsStarFill } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import ReorderIcon from "@mui/icons-material/Reorder";
import { NameContext } from "../Context";
import { isEligibleContext, CurrentUserContext } from "../Context";
import { CgProfile } from "react-icons/cg";
import {
  MdDelete,
  MdEdit,
  MdExpandMore,
  MdExpandLess,
  MdModeComment,
  MdOutlineComment,
  MdOutlineUnfoldMore,
  MdUnfoldLess,
} from "react-icons/md";
import CategorySelector from "../components/CategorySelector";
import CategorySearchDropdown from "../components/CategorySearchDropdown";
import SearchSuggestion from "../components/SearchSuggestion";
import { Carousel, ProgressBar } from "react-bootstrap";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Fade from "@mui/material/Fade";
import StarRatings from "react-star-ratings";

//identical to home.js

export default function Landing() {
  const [cartitems, setCartItems] = useState([]);
  const [show, setShow] = useState(false);
  const [text, setText] = useState("hey");

  const [showReview, setShowReview] = useState(false);
  const [showRating, setShowRating] = useState(false);

  const [Inventory, setItems] = useState([]);
  const itemRef = collection(db, "Inventory");
  const { cart, setCart } = useContext(CartContext);
  const { name, setName } = useContext(NameContext);
  const [Users, setUsers] = useState([]);
  const { isEligible, setIsEligible } = useContext(isEligibleContext);
  const { User, setUser } = useContext(CurrentUserContext);

  //for the search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [suggestionDropdown, setSuggestionDropdown] = useState(true);

  const [userName, setUserName] = useState("");
  useEffect(() => {
    for (let i in Users) {
      if (Users[i].Email == name) {
        setUserName(Users[i].Name);
      }
    }
  }, [Users]);

  // This is for loading spinner
  let [loading, setLoading] = useState(true);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-top: 250px;
  `;

  // Advanced Tooltip for Reviews
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  //state for collapsing the filter by category
  const [isFilter, setIsFilter] = useState(false);
  const handleFilter = () => {
    if (isFilter) {
      setIsFilter(false);
    } else {
      setIsFilter(true);
    }
  };

  const allCategories = [
    "All",
    "Automotive",
    "Baby",
    "Beauty & Personal Care",
    "Books",
    "Cellphones & Wearables",
    "Computers & Electronics",
    "Gaming",
    "Fashion",
    "Health & Household",
    "Home & Appliances",
    "Liquor",
    "Office & Stationary",
    "Pets",
    "Sport & Training",
    "Toys",
    "TV Audio & Media",
  ];

  //State for the currently selected category
  const [categoriesActivity, setAllCategoriesActivity] = useState([
    {
      categoryName: "All",
      active: true,
      products: [],
    },
    {
      categoryName: "Automotive",
      active: false,
      products: [],
    },
    {
      categoryName: "Baby",
      active: false,
      products: [],
    },
    {
      categoryName: "Beauty & Personal Care",
      active: false,
      products: [],
    },
    {
      categoryName: "Books",
      active: false,
      products: [],
    },
    {
      categoryName: "Cellphones & Wearables",
      active: false,
      products: [],
    },
    {
      categoryName: "Computers & Electronics",
      active: false,
      products: [],
    },
    {
      categoryName: "Gaming",
      active: false,
      products: [],
    },
    {
      categoryName: "Fashion",
      active: false,
      products: [],
    },
    {
      categoryName: "Health & Household",
      active: false,
      products: [],
    },
    {
      categoryName: "Home & Appliances",
      active: false,
      products: [],
    },
    {
      categoryName: "Liquor",
      active: false,
      products: [],
    },
    {
      categoryName: "Office & Stationary",
      active: false,
      products: [],
    },
    {
      categoryName: "Pets",
      active: false,
      products: [],
    },
    {
      categoryName: "Sport & Training",
      active: false,
      products: [],
    },
    {
      categoryName: "Toys",
      active: false,
      products: [],
    },
    {
      categoryName: "TV Audio & Media",
      active: false,
      products: [],
    },
  ]);

  //currently active search category
  const [searchActiveCategory, setSearchActiveCategory] = useState([
    {
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
    },
  ]);

  const [currentSearchCategory, setCurrentSearchCategory] = useState(
    searchActiveCategory.find((category) => category.active).categoryName
  );
  // check if user has details or not
  function hasdetails() {
    for (let i = 0; i < Users.length; i = i + 1) {
      if (Users[i].Email == name) {
        setUser(Users[i]);
      }

      if (Users[i].Email == name && Users[i].isEligibleToPay) {
        return true;
      }
    }
    return false;
  }

  //handle user typing in search box
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //function to search for an item in a given category
  const searchCategory = (categoryName) => {
    let category = categoriesActivity.find(
      (category) => category.categoryName == categoryName
    ).products;
    let tempArr = [];
    for (let i in category) {
      let stringToSearch = category[i].Name.toLowerCase().replace(/\s/g, "");

      if (
        stringToSearch.includes(searchTerm.toLowerCase().replace(/\s/g, ""))
      ) {
        tempArr = [...tempArr, category[i]];
        setSearchedProducts([...tempArr]);
      }
    }
  };

  //useEffect for when the category selection changes
  useEffect(() => {
    if (searchTerm != "") {
      searchCategory(currentSearchCategory);
    }
  }, [currentSearchCategory]);

  useEffect(() => {
    searchCategory(currentSearchCategory);
  }, [searchTerm]);

  //used to show the category search dropdown menu
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  const handleDropdown = () => {
    if (categoryDropdown) {
      setCategoryDropdown(false);
    } else {
      setCategoryDropdown(true);
    }
  };

  //function to split the string of categories by ,
  const splitCategories = (categoriesString) => {
    const categoriesArray = categoriesString.split(",");
    return categoriesArray;
  };

  const [currentActiveCategory, setCurrentActiveCategory] = useState("All");
  //useEffect for the currenctly selected category
  useEffect(() => {
    setCurrentActiveCategory(
      categoriesActivity.find((category) => category.active).categoryName
    );
  }, [categoriesActivity]);

  //useEffect for setting up the categories
  useEffect(() => {
    let tempArr = [...categoriesActivity];
    for (let x in allCategories) {
      let currentCategory = allCategories[x];
      for (let i in Inventory) {
        let productCategories = splitCategories(Inventory[i].Categories);
        if (productCategories.includes(currentCategory)) {
          let theCategory = tempArr.find(
            (category) => category.categoryName == currentCategory
          );
          theCategory.products.push(Inventory[i]);
        }
      }
    }
    setAllCategoriesActivity([...tempArr]);
  }, [Inventory]);

  // Variables for reviews
  let str = "";

  let add = "";
  let rev = "";

  let user = "";

  const AddReview = async (item, star, review, user) => {
    //handles adding a review to database
    await setDoc(
      doc(db, "Inventory", item.id),
      {
        Review: review,
        Stars: star,
        ReviewUser: user,
      },
      { merge: true }
    );
    alert("Review submitted");
  };

  // The following function count the average rating of each item (using stars)
  function avgStars(stars) {
    let starCount = "" + stars;
    let wholeSum = 0;
    let check = 0;

    for (let i = 0; i < starCount.length; i++) {
      if (starCount[i] == "*") {
        check++;
      } else {
        wholeSum = wholeSum + parseInt(starCount[i]);
      }
    }
    let average = wholeSum / (starCount.length - check);

    if (starCount.length == 0) {
      return "5.0 ";
    } else {
      return average.toFixed(1) + " ";
    }
  }

  // Function to put reviews in a list
  function review(reviews) {
    const reviewList = reviews.toString().split("*");
    return reviewList;
  }

  // Function to put user's name for the review in a list
  function reviewUser(users) {
    let usersList = users.toString().split("*");
    return usersList;
  }
  function starsL(stars, starCount) {
    const s = stars + "";
    const starsList = s.split("*");
    starsList.shift();
    starsList.unshift(starCount);
    return starsList;
  }

  // Funtion that returns the number of reviews
  function reviewNumber(reviews) {
    let counter = 0;
    let review = "" + reviews;
    for (let i = 0; i < review.length; i++) {
      if (review[i] == "*") {
        counter++;
      }
    }
    if (counter == 0) {
      return "";
    } else {
      return " (" + counter.toString() + ")";
    }
  }
  function reviewNumberIn(reviews) {
    let counter = 0;
    let review = "" + reviews;
    for (let i = 0; i < review.length; i++) {
      if (review[i] == "*") {
        counter++;
      }
    }
    if (counter == 0) {
      return " ";
    } else {
      return counter.toString() + " ";
    }
  }

  // Reviews or Review or No Review
  function correctReview(reviews) {
    let counter = 0;
    let review = "" + reviews;
    for (let i = 0; i < review.length; i++) {
      if (review[i] == "*") {
        counter++;
      }
    }

    if (counter == 0) {
      return "No reviews";
    } else if (counter == 1) {
      return "Review";
    } else {
      return "Reviews";
    }
  }

  // Function to return the percentage of stars
  function percentOfStars(stars) {
    let s = stars + "";
    const starsList = s.split("*");
    let count = [0, 0, 0, 0, 0];

    for (let i = 0; i < starsList.length; i++) {
      switch (starsList[i]) {
        case "1":
          count[0] += 1;
          break;
        case "2":
          count[1] += 1;
          break;
        case "3":
          count[2] += 1;
          break;
        case "4":
          count[3] += 1;
          break;
        case "5":
          count[4] += 1;
      }
    }

    let n = starsList.length - 1;
    let percentage = [
      (count[0] / n) * 100,
      (count[1] / n) * 100,
      (count[2] / n) * 100,
      (count[3] / n) * 100,
      (count[4] / n) * 100,
    ];

    return percentage;
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(collection(db, "Users"));
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      const data = await getDocs(itemRef);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };

    getItems();
  }, []);

  function Navbar() {
    const [total, setTotal] = useState(0);
    const [showLinks, setShowLinks] = useState(false);
    const [showcart, setShowCart] = useState(false);
    const [summary, setSummary] = useState("");
    let t = 0;

    function CartView() {
      setShowCart(!showcart);
      setSummary(
        cartitems.map(function (currentValue, index, array) {
          return index >= 0 ? (
            <div className="cartitemdiv">
              <div className="cartleft">
                <img src={currentValue.Image} className="pic" />
              </div>
              <div className="cartright">
                <h6 className="cartid">{currentValue.Name}</h6>
                <h6 className="cartpricep">R{currentValue.Price}</h6>
              </div>
            </div>
          ) : null;
        })
      );

      for (let i = 0; i < cartitems.length; i++) {
        const element = cartitems[i];
        t += element.Price;
      }
      t = t.toFixed(2);

      setTotal(t);
    }
    return (
      <div>
        <div className="navbar">
          <div className="leftside">
            <div className="links" id={showLinks ? "hidden" : ""}>
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Profile"
              >
                <Link className="profile-icon" to="/profile">
                  <CgProfile className="profile-icon" />
                </Link>
              </Tooltip>

              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Go to Home"
              >
                <Link className="navlink" to="/landing">
                  <p>Home</p>
                </Link>
              </Tooltip>

              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Sell on GiveALittle"
              >
                <Link className="navlink" to="/sellerslanding">
                  <p>Sell</p>
                </Link>
              </Tooltip>

              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="About Us"
              >
                <Link className="navlink" to="/about">
                  <p>About</p>
                </Link>
              </Tooltip>

              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Contact Us"
              >
                <Link className="navlink" to="/contact">
                  <p>Contact</p>
                </Link>
              </Tooltip>

              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Your Cart"
              >
                <Link
                  className="navlink"
                  onClick={() => {
                    CartView();
                  }}
                >
                  <p>Cart</p>
                </Link>
              </Tooltip>

              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Open your orders"
              >
                <Link className="navlink" to="/track">
                  <p> MyOrders</p>
                </Link>
              </Tooltip>

              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Sold items"
              >
                <Link className="navlink" to="/sold">
                  <p> Sold</p>
                </Link>
              </Tooltip>
            </div>

            <button onClick={() => setShowLinks(!showLinks)}>≡</button>
          </div>

          <div className="rightside">
            <div className="drop-down-container">
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Search by category"
              >
                <button
                  className="search-category-button"
                  onClick={handleDropdown}
                >
                  {currentSearchCategory}
                </button>
              </Tooltip>
              {categoryDropdown ? (
                <CategorySearchDropdown
                  searchActiveCategory={searchActiveCategory}
                  setSearchActiveCategory={setSearchActiveCategory}
                  currentSearchCategory={currentSearchCategory}
                  setCurrentSearchCategory={setCurrentSearchCategory}
                  setCategoryDropdown={setCategoryDropdown}
                />
              ) : null}
            </div>

            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Search for product"
            >
              <button
                className="btnsearch"
                onClick={() => searchCategory(currentSearchCategory)}
              >
                Search
              </button>
            </Tooltip>
          </div>
        </div>

        {showcart ? (
          <div className="cartdiv">
            {summary}
            <div className="demodiv">
              <text className="textin">R{total}</text>
              <Link className="navlink" to="/MakeTransactionAddress">
                {setIsEligible(hasdetails())}

                <button className="buttonin">Check out</button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  function handleCartItems(item) {
    setCartItems((prev) => {
      return cartitems.includes(item) ? prev : [...prev, item];
    });

    alert("Item added to cart");
  }

  useEffect(() => {
    setCart(cartitems);
  }, [cartitems]);

  function handleReviews(item) {
    const ratingChanged = (rating) => {
      str = "" + item.Stars + "*" + rating.toString();
      user = "" + item.ReviewUser + "*" + userName.toString();
      console.log(name);
    };
    setShowReview(true);
    setText(
      <div>
        <div className="item-container">
          <div className="clod">
            <button
              className="btnclose"
              onClick={() => {
                setShowReview(false);
                ProductView(item);
              }}
            >
              Close Reviews
            </button>
          </div>

          <div>
            <img
              style={{ boxShadow: "0px 0px 10px 0px rgb(200, 200, 200)" }}
              src={item.Image}
            />
          </div>
          <h3>{item.Name}</h3>
          <p>{item.Description}</p>

          <div className="starratediv">
            <ReactStars
              size={45}
              count={5}
              isHalf={false}
              onChange={ratingChanged}
              className="st"
            />
          </div>

          <input
            className="edtdesc"
            id="input"
            placeholder="Item Review"
            onChange={(event) => {
              add = "*" + event.target.value.toString();
            }}
          />

          <div>
            <button
              className="btnclose"
              onClick={() => {
                rev = "" + item.Review + add;
                AddReview(item, str, rev, user);
                setShowReview(false);
                ProductView(item);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  function viewReviews(item) {
    const starCount = avgStars(item.Stars);
    const reviewStars = starsL(item.Stars, starCount);
    const comments = review(item.Review);
    const users = reviewUser(item.ReviewUser);

    //combine comment with a star
    let zip = (users, comments, reviewStars) =>
      comments.map((x, i) => [x, reviewStars[i], users[i]]);
    const clist = zip(users, comments, reviewStars);
    const commentList = clist.map((comment) => (
      <div className="indrev">
        <div className="user">{comment[2]}</div>

        {comment[0]}
        <div style={{}}>
          <StarRatings
            rating={parseFloat(comment[1])}
            starRatedColor="yellow"
            starDimension="20px"
            name="rating"
          />
        </div>
      </div>
    ));
    setShowReview(true);
    setText(
      <div>
        <div className="item-container">
          <div className="clod">
            <button
              className="btnclose"
              onClick={() => {
                setShowReview(false);
                ProductView(item);
              }}
            >
              Close Reviews
            </button>
          </div>

          <div>
            <img
              style={{ boxShadow: "0px 0px 10px 0px rgb(200, 200, 200)" }}
              src={item.Image}
            />
          </div>
          <h3>{item.Name}</h3>
          <p>{item.Description}</p>
          <br />
          <div className="revdivin">
            <h5>Reviews</h5>
            <div className="allrevshl">
              <div className="revcomm">{commentList}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function ProductView(item) {
    setShow(true);
    setText(
      <div>
        <div className="item-container">
          <motion.div
            initial={{ y: -250 }}
            animate={{ y: -10 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 50 }}
            className="clod"
          >
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Close Product View"
            >
              <button className="btnclose" onClick={() => setShow(false)}>
                Close
              </button>
            </Tooltip>
          </motion.div>

          <Carousel variant = "dark">
            {/* Images */}
            <Carousel.Item>
              <img
                style={{ boxShadow: "0px 0px 10px 0px rgb(200, 200, 200)" }}
                src={item.Image}
                alt=""
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                style={{ boxShadow: "0px 0px 10px 0px rgb(200, 200, 200)" }}
                src={item.Image2}
                alt=""
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                style={{ boxShadow: "0px 0px 10px 0px rgb(200, 200, 200)" }}
                src={item.Image3}
                alt=""
              />
            </Carousel.Item>
          </Carousel>
          {Users.map((user, index) =>
            user.Email == item.Seller ? (
              <p key={index}>Sold By : {user.Name}</p>
            ) : null
          )}

          <h5 style={{ color: "#50A181" }}>{item.Categories.substring(4)}</h5>

          <h3>{item.Name}</h3>

          <h1 className="product-view-price">R{item.Price}</h1>

          <p>{item.Description}</p>

          {item.Specs != undefined ? (
            <h4 className="table-title">Product Specifications</h4>
          ) : (
            <h4></h4>
          )}

          {item.Specs != undefined ? (
            item.Specs.map((spec, index) => {
              return (
                <div
                  className="spec-container"
                  style={{ marginBottom: "0" }}
                  key={index}
                >
                  <h6 className="spec-name" style={{ marginBottom: "0" }}>
                    {spec.spec}
                  </h6>
                  <h6 className="spec-detail" style={{ marginBottom: "0" }}>
                    {spec.detail}
                  </h6>
                </div>
              );
            })
          ) : (
            <h1></h1>
          )}

          <div className="add-to-cart">
            <input
              type="number"
              className="edtnum"
              placeholder="1"
              min="0"
              max={item.Quantity}
            />
            <button className="btnadd" onClick={() => handleCartItems(item)}>
              Add to cart
            </button>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    Star Rating for this item
                  </Typography>

                  <div>
                    <ProgressBar
                      now={percentOfStars(item.Stars)[4]}
                      label={`5`}
                    />
                    <ProgressBar
                      variant="success"
                      now={percentOfStars(item.Stars)[3]}
                      label={`4`}
                    />
                    <ProgressBar
                      variant="info"
                      now={percentOfStars(item.Stars)[2]}
                      label={`3`}
                    />
                    <ProgressBar
                      variant="warning"
                      now={percentOfStars(item.Stars)[1]}
                      label={`2`}
                    />
                    <ProgressBar
                      variant="danger"
                      now={percentOfStars(item.Stars)[0]}
                      label={`1`}
                    />
                  </div>
                </React.Fragment>
              }
            >
              <div className="inprodstar">
                <BsStarFill className="initemsstar" />
                {avgStars(item.Stars)}

                <Link onClick={() => viewReviews(item)}>
                  {reviewNumberIn(item.Review)}
                  {correctReview(item.Review)}
                </Link>
              </div>
            </HtmlTooltip>

            {showReview ? (
              <div className="reviewdiv">{text}</div>
            ) : (
              <button className="btnReview" onClick={() => handleReviews(item)}>
                Write a review
              </button>
            )}
          </div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      exit={({ opacity: 0 }, { duration: 0.5 })}
    >
      <Navbar />
      <SearchSuggestion
        searchedProducts={searchedProducts}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        suggestionDropdown={suggestionDropdown}
        setSuggestionDropdown={setSuggestionDropdown}
      />
      <input
        className="edtsearch"
        placeholder="Search"
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
      ></input>

      {show == false ? (
        <div>
          {isFilter ? (
            <button
              className="filter"
              style={{ backgroundColor: "#9ccc64" }}
              onClick={handleFilter}
            >
              Close Filter
            </button>
          ) : (
            <button className="filter" onClick={handleFilter}>
              Filter by Category
            </button>
          )}

          {isFilter ? (
            <CategorySelector
              categoriesActivity={categoriesActivity}
              setAllCategoriesActivity={setAllCategoriesActivity}
              setCategoryDropdown={setCategoryDropdown}
            />
          ) : null}

          {searchedProducts.length != 0 && searchTerm != "" ? (
            <div>
              {searchTerm != "" ? (
                <h6 className="category-search-heading">
                  ({searchedProducts.length}) Results for "{searchTerm}" in{" "}
                  <span className="search-result-category">
                    {currentSearchCategory}
                  </span>
                </h6>
              ) : null}
              <div className="bodydiv">
                {searchedProducts.map((item, itemIndex) => {
                  return (
                    <div
                      key={itemIndex}
                      className="itemdiv"
                      onClick={() => {
                        ProductView(item);
                      }}
                    >
                      <img src={item.Image} alt="nope" />
                      <div className="textdiv">
                        <h1 className="itemname">{item.Name}</h1>
                      </div>
                      <h1 className="itemprice">R{item.Price}</h1>
                      <div className="itemstar">
                        <BsStarFill className="sumstar" />{" "}
                        {avgStars(item.Stars)}
                        {reviewNumber(item.Review)}
                      </div>
                      {(() => {
                        if (item.Quantity == 0) {
                          return (
                            <h1
                              style={{ fontWeight: "bold", color: "#B38B59" }}
                              className="item-quantity"
                            >
                              sold out
                            </h1>
                          );
                        } else {
                          return <h1 className="item-quantity">in stock</h1>;
                        }
                      })()}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div>
            <h6 className="category-heading">
              {currentActiveCategory +
                " (" +
                categoriesActivity.find(
                  (category) => category.categoryName == currentActiveCategory
                ).products.length +
                ")"}
            </h6>

            {loading ? (
              <HashLoader
                color={"B38B59"}
                css={override}
                loading={loading}
                size={120}
              />
            ) : show ? (
              <div className="reviewdiv">{text}</div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                exit={({ opacity: 0 }, { duration: 0.5 })}
                className="bodydiv"
              >
                {categoriesActivity
                  .find(
                    (category) => category.categoryName == currentActiveCategory
                  )
                  .products.map((item, itemIndex) => {
                    return (
                      <div
                        key={itemIndex}
                        className="itemdiv"
                        onClick={() => {
                          ProductView(item);
                        }}
                      >
                        <img src={item.Image} alt="nope" />
                        <div className="textdiv">
                          <h1 className="itemname">{item.Name}</h1>
                        </div>
                        <h1 className="itemprice">R{item.Price}</h1>
                        <div className="itemstar">
                          <BsStarFill className="sumstar" />{" "}
                          {avgStars(item.Stars)}
                          {reviewNumber(item.Review)}
                        </div>
                        {(() => {
                          if (item.Quantity == 0) {
                            return (
                              <h1
                                style={{ fontWeight: "bold", color: "#B38B59" }}
                                className="item-quantity"
                              >
                                sold out
                              </h1>
                            );
                          } else {
                            return <h1 className="item-quantity">in stock</h1>;
                          }
                        })()}
                      </div>
                    );
                  })}
              </motion.div>
            )}
          </div>
        </div>
      ) : null}

      {show ? (
        <div className="reviewdiv">{text}</div>
      ) : (
        <div className="bodydiv">
          {Inventory.map((item, indx) => {
            return (
              <div
                key={indx}
                className="itemdiv"
                onClick={() => {
                  ProductView(item);
                }}
              ></div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
