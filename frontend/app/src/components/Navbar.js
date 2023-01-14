import React, { useState, useEffect } from "react";
import { Button, LogoutButton, SignupButton } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  // the initial value will be false
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  // change the click state to the opposite of what it is now
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // showing or hiding the button depending on the screen size

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  // this function makes sure the buttons don t change their state when refreshing
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  window.addEventListener("resize", showButton);

  if (!localStorage.username) {
    return (
      <>
        <nav className="navbar">
          <div className="navbar-container">
            {/* link replaces the a tag */}
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              Powerpuff&nbsp; <i class="fa fa-bug" aria-hidden="true"></i>
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                  Log in
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/sign-up"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
            {button && (
              <SignupButton buttonStyle="btn--outline">SIGN UP</SignupButton>
            )}
          </div>
        </nav>
      </>
    );
  }
  else {
    return (
      <>
        <nav className="navbar">
          <div className="navbar-container">
            {/* link replaces the a tag */}
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              Powerpuff&nbsp;<i class="fa fa-bug" aria-hidden="true"></i>
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/view-teams" className="nav-links" onClick={closeMobileMenu}>
                  Teams
                </Link>
              </li>
              <li className="nav-item nav-username">
                <span className="nav-links">{localStorage.username}</span>
              </li>
            </ul>
            {button && (
              <LogoutButton>LOG OUT</LogoutButton>
            )}
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
