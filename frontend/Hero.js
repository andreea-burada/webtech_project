import React from 'react';
import '../App.css';
import { Button } from './Button';
import './Hero.css';

function Hero() {
    return (
      <div className='hero-container'>
      
        <h1>The software solution  </h1>
        <p>designed to drive software development</p>
        <div className='hero-btns'>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            GET STARTED
          </Button>
          
        </div>
      </div>
    );
  }

export default Hero;