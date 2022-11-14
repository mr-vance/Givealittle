import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function HomeNavBar() {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div>
      <div className="navbar">
        <div className="leftside">
          <div className="links" id={showLinks ? "hidden" : ""}>
            <Link className="navlink" to='/'>
              <p>Home</p>
            </Link>
            <Link className="navlink" to="/login">
              <p>Login/Signup</p>
            </Link>
            <Link className="navlink" to="/homeabout">
              <p>About</p>
            </Link>
            <Link className="navlink" to="/homecontact">
              <p>Contact</p>
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
    </div>
  );
}
