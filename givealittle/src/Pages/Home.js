import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./Home.css";
import { css } from "@emotion/react";
import { CartContext } from "../Context";
import { LoginContext } from "../Context";
import { BsStarFill } from "react-icons/bs";
import { NameContext } from "../Context";
import { Carousel, ProgressBar } from "react-bootstrap";
import HashLoader from "react-spinners/HashLoader";
import { motion } from "framer-motion";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Fade from "@mui/material/Fade";
import StarRatings from "react-star-ratings";

export default function Home() {
  const [cartitems, setCartItems] = useState([]); //state for local cart array
  const [show, setShow] = useState(false); //state for showing cart
  const [text, setText] = useState(""); //state for product text
  const [Inventory, setItems] = useState([]); //state for inventory
  const itemRef = collection(db, "Inventory"); //reference to inventory in database
  const { cart, setCart } = useContext(CartContext); //context for global cart
  const { login, setLogin } = useContext(LoginContext);
  const [Users, setUsers] = useState([]);

  const [showReview, setShowReview] = useState(false);

  function isCheckout() {
    alert("create a profile or login to Checkout");
  }

  // This is for loading spinner
  let [loading, setLoading] = useState(false);
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
      return average.toFixed(1).toString() + " ";
    }
  }
  // Function to put reviews in a list
  function review(reviews) {
    let reviewList = reviews.toString().split("*");
    reviewList.shift();
    return reviewList;
  }

  // Function to put user's name for the review in a list
  function reviewUser(users) {
    let s = users + "";
    let usersList = s.split("*");
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

  const searchRef = useRef();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(collection(db, "Users"));
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  function Navbar() {
    //function for navbar component
    const [quant, setQuant] = useState(0); //to be used
    const [total, setTotal] = useState(0); //state for cart total
    const [showLinks, setShowLinks] = useState(false); //state for showing links
    const [showcart, setShowCart] = useState(false); //state for showing cart
    const [summary, setSummary] = useState(""); //state for cart summary
    let t = 0; //total = 0

    let sum = 0;

    function CartView() {
      //function to display the cart
      setShowCart(!showcart); //changes show cart state

      setSummary(
        //set summary to all items in cart array
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
        //set total price
        const element = cartitems[i];
        t += element.Price;
      }
      t = t.toFixed(2);

      setTotal(t); //changes total state to total price
    }

    return (
      <div>
        <div className="navbar">
          <div className="leftside">
            <div className="links" id={showLinks ? "hidden" : ""}>
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Go to home"
              >
                <Link className="navlink" to="/">
                  <p>Home</p>
                </Link>
              </Tooltip>

              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Login Or Signup"
              >
                <Link className="navlink" to="/login">
                  <p>Login/Signup</p>
                </Link>
              </Tooltip>

              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="About Us"
              >
                <Link className="navlink" to="/homeabout">
                  <p>About</p>
                </Link>
              </Tooltip>

              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Contact Us"
              >
                <Link className="navlink" to="/homecontact">
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
            </div>
            <button
              onClick={() => setShowLinks(!showLinks)}
              className="btnthings"
            >
              ≡
            </button>
          </div>
          <div className="rightside">
            <input
              class="edtsearchhome"
              type="text"
              placeholder="Search..."
              ref={searchRef}
            />
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Search for product"
            >
              <button
                className="btnsearch"
                onClick={() => {
                  setSearchTerm(searchRef.current.value);
                }}
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
              <button className="buttonin" onClick={() => isCheckout()}>
                Check out
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  useEffect(() => {
    //loads data from database
    const getItems = async () => {
      setLoading(true);
      const data = await getDocs(itemRef);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };

    getItems();
  }, []);

  function handleCartItems(item) {
    //handles adding an item to the cart
    alert("Item added to cart");
    setCartItems((prev) => {
      return cartitems.includes(item) ? prev : [...prev, item];
    });
  }

  useEffect(() => {
    //updates the global cart to match the local cart
    setCart(cartitems);
  }, [cartitems]);

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
              alt=""
            />
          </div>
          <div className="descr">
            <h3>{item.Name}</h3>
            <p>{item.Description}</p>
          </div>
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
    //handles the viewing of a product in isolation
    setShow(true);
    //const [Users, setUsers] = useState([]);

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
              <button variant="success" className="btnclose" onClick={() => setShow(false)}>
                Close
              </button>
            </Tooltip>
          </motion.div>
          <Carousel variant="dark" className="prodCarousel">
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
          {Users.map((user, idx) =>
            user.Email === item.Seller ? <p>Sold By : {user.Name}</p> : null
          )}
          <div className="descr">
            <h3>{item.Name}</h3>
            <p>{item.Description}</p>
          </div>
          <h1 className="product-view-price">R{item.Price}</h1>
          <div>
            <input
              type="number"
              className="edtnum"
              placeholder="1"
              min="0"
              max={item.Quantity}
            />
            <button variant="warning" className="btnadd" onClick={() => handleCartItems(item)}>
              Add to cart
            </button>
          </div>

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
              {/* <BsStarFill className="initemsstar" />
              {avgStars(item.Stars)} */}

              <Link onClick={() => viewReviews(item)}>
                {reviewNumberIn(item.Review)}
                {correctReview(item.Review)}
              </Link>
              <div
                style={{
                  marginTop: "10px",
                }}
              >
                <StarRatings
                  rating={parseFloat(avgStars(item.Stars))}
                  starRatedColor="yellow"
                  starDimension="20px"
                  name="rating"
                />
              </div>
            </div>
          </HtmlTooltip>
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
          {Inventory.filter((item) => {
            if (searchTerm == "") {
              return item;
            } else if (
              item.Name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
            ) {
              return item;
            }
          }).map((item) => {
            return (
              <div
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
                  <BsStarFill className="sumstar" /> {avgStars(item.Stars)}
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
    </motion.div>
  );
}
