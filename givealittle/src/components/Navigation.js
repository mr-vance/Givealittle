import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Tooltip } from "@mui/material";
import Fade from "@mui/material/Fade";

function Navigation() {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="navbar">
      <div className="leftside">
        <div className="links" id={showLinks ? "hidden" : ""}>
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title="My Profile"
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
            <Link className="navlink" to="/landing">
              <p> Cart</p>
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
        <button onClick={() => setShowLinks(!showLinks)} className="btnthings">
          ≡
        </button>
      </div>
    </div>
  );
}

export default Navigation;
