import React from "react";
import "../App.css";
import { Button, LoginModalButton } from "./Button";
import "./Hero.css";

function Hero() {
  return (
    <div className="hero-container">
      <h1>BUG TRACKING PLATFORM</h1>
      <p>Start tracking bugs today!</p>
      <div className="hero-btns">
        <LoginModalButton
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          GET STARTED
        </LoginModalButton>
      </div>
    </div>
  );
}

export default Hero;
