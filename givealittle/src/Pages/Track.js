import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Container, Row } from "reactstrap";
import Purchased from "../components/Purchased";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { NameContext } from "../Context";
import "./Track.css";
import {
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import Navigation from "../components/Navigation";
import { motion } from "framer-motion";

export default function Track() {
  const [bought, setproducts] = useState([]); //state for bought
  const productRef = collection(db, "Bought"); //reference to bought in database
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const { name, setName } = useContext(NameContext);

  useEffect(() => {
    //loads data from database
    const getproducts = async () => {
      const data = await getDocs(productRef);

      setproducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getproducts();
  }, []);
  function ProductView(product) {
    const items = [];
    for (var i = 0; i < product.Time.length; i++) {
      items.push({
        LocationDescription: product.LocationDescription[i],
        Time: product.Time[i],
      });
    }
    setShow(true);
    setText(
      <div>
        <button className="btnclose" onClick={() => setShow(false)}>
          <KeyboardBackspaceIcon />
        </button>
        <h3 className="heading"> My Orders </h3>
        <div className="cont-div">
          <div className="left">
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="130"
                image={product.Image}
                alt=""
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.Name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.Description}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  R {product.Price}
                </Typography>
              </CardContent>
            </Card>
          </div>

          <div className="right">
            <Card sx={{ maxWidth: 400 }}>
              <Stepper
                activeStep={
                  items[items.length - 1].LocationDescription.includes(
                    "COLLECTED"
                  )
                    ? items.length
                    : items.length - 1
                }
                orientation="vertical"
              >
                {items.map((item) => {
                  return (
                    <Step>
                      <StepLabel className="step-label">
                        {item.LocationDescription} - {item.Time}
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Card>
          </div>
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
      <Navigation />
      {show ? (
        <div className="reviewdiv">{text}</div>
      ) : (
        <Container fluid="lg">
          <Row style={{ justifyContent: "center" }}>
            {bought.map((product) => {
              if (product.Buyer === name)
                //the logged in user should only see his/her items that they recently bought.
                return (
                  <div
                    className="productdiv"
                    onClick={() => {
                      ProductView(product);
                    }}
                  >
                    <Purchased
                      image={product.Image}
                      name={product.Name}
                      price={product.Price}
                      delivery={
                        product.LocationDescription[
                          product.LocationDescription.length - 1
                        ].includes("COLLECTED")
                          ? "Order Collected!"
                          : "Your Order Is On Its Way!"
                      }
                    />
                  </div>
                );
            })}
          </Row>
        </Container>
      )}
    </motion.div>
  );
}

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  return (
    <div className="navbar">
      <div className="leftside">
        <div className="links" id={showLinks ? "hidden" : ""}>
          <Link className="navlink" to="/landing">
            <p>Home</p>
          </Link>
          <Link className="navlink" to="/login">
            <p>About</p>
          </Link>
          <Link className="navlink" to="/login">
            <p>Contact</p>
          </Link>
          <Link className="navlink" to="/sold">
            <p>Sold</p>
          </Link>
        </div>
        <button onClick={() => setShowLinks(!showLinks)} className="btnthings">
          ≡
        </button>
      </div>
    </div>
  );
}
