import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { CardActionArea } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { NameContext } from "../Context";
import "./Sold.css";
import {
  StepLabel,
  Step,
  Stepper,
  Typography,
  CardMedia,
  CardContent,
  Card,
  ListItem,
  TextField,
  Button,
  SwipeableDrawer,
  Box,
} from "@mui/material";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";

export default function Sold() {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [purchased, setItems] = useState([]);
  const itemRef = collection(db, "Bought");
  const { name, setName } = useContext(NameContext);
  function Navbar() {
    const [showLinks, setShowLinks] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        exit={({ opacity: 0 }, { duration: 0.5 })}
      >
        <div className="navbar">
          <div className="leftside">
            <div className="links" id={showLinks ? "hidden" : ""}>
              <Link className="profile-icon" to="/profile">
                <CgProfile className="profile-icon" />
              </Link>

              <Link className="navlink" to="/landing">
                <p>Home</p>
              </Link>

              <Link className="navlink" to="/sellerslanding">
                <p>Sell</p>
              </Link>
              <Link className="navlink" to="/about">
                <p>About</p>
              </Link>
              <Link className="navlink" to="/contact">
                <p>Contact</p>
              </Link>

              <Link className="navlink" to="/landing">
                <p> Cart</p>
              </Link>

              <Link className="navlink" to="/track">
                <p> MyOrders</p>
              </Link>
              <Link className="navlink" to="/sold">
                <p> Sold</p>
              </Link>
            </div>
            <button
              onClick={() => setShowLinks(!showLinks)}
              className="btnthings"
            >
              ≡
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(itemRef);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getItems();
  }, []);

  function Drawer(item) {
    const [location, updateLocation] = useState(""); //state for item name
    const [time, updateTime] = useState(""); //state for description

    const [state, setState] = React.useState({
      right: false,
    });

    const update = async () => {
      const docSnap = await getDoc(doc(db, "Bought", item.item_id));
      const newInfo = [];
      var ld = [];
      var t = [];
      for (var i = 0; i < docSnap.data().LocationDescription.length; i++) {
        ld.push(docSnap.data().LocationDescription[i]);
        t.push(docSnap.data().Time[i]);
      }
      ld.push(location);
      t.push(time);
      newInfo.push({
        LocationDescription: ld,
        Time: t,
      });

      await setDoc(
        doc(db, "Bought", item.item_id),
        {
          LocationDescription: ld,
          Time: t,
        },
        { merge: true }
      );
    };
    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
      <Box
        sx={{
          "& .MuiTextField-root": { m: 0, width: "25ch" },
        }}
        role="presentation"
        component="form"
      >
        {" "}
        <ListItem>
          <TextField
            label="Location"
            type="text"
            className="location"
            id="location"
            onChange={(event) => {
              updateLocation(event.target.value);
            }}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Time"
            type="text"
            className="time"
            id="time"
            onChange={(event) => {
              updateTime(event.target.value);
            }}
          />
        </ListItem>
        <div className="btn-update-cont">
          <Card
            className="btn-update"
            onClick={() => {
              update();
            }}
          >
            <CardActionArea>UPDATE</CardActionArea>
          </Card>
        </div>
      </Box>
    );

    return (
      <div>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              className="delivery-btn"
              variant="contained"
              onClick={toggleDrawer(anchor, true)}
            >
              Update on Delivery
            </Button>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
        <br />
      </div>
    );
  }

  function ProductView(item) {
    const items = [];
    for (var i = 0; i < item.Time.length; i++) {
      items.push({
        LocationDescription: item.LocationDescription[i],
        Time: item.Time[i],
      });
    }
    setShow(true);
    setText(
      <div>
        <button className="btnclose" onClick={() => setShow(false)}>
          <KeyboardBackspaceIcon />
        </button>
        <div className="buyer">Reciever: {item.Buyer}</div>
        <div className="prodView">
          <div className="left-side">
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.Image}
                alt=""
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.Name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.Description}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  R {item.Price}
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="right-side">
            <Drawer item_id={item.id} className="right-top" />
            <div className="right-botton">
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
                  {items.map((it) => {
                    return (
                      <Step>
                        <StepLabel className="step-label">
                          {it.LocationDescription} - {it.Time}
                        </StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {show ? (
        <div className="reviewdiv">{text}</div>
      ) : (
        <div className="bodydiv">
          {purchased.map((item) => {
            if (item.Seller == name)
              //the logged in user should only see his/her products that they have been bought buy others.
              return (
                <div
                  className="itemdiv"
                  onClick={() => {
                    ProductView(item);
                  }}
                >
                  <img src={item.Image} alt="" />
                  <div className="textdiv">
                    <h1 className="itemname">{item.Name}</h1>
                  </div>
                  <h1 className="itemprice">R{item.Price}</h1>
                </div>
              );
            // else return;
          })}
        </div>
      )}
    </div>
  );
}
