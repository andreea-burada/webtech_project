import React, { useState } from 'react';
import './Form.css';
import './Errors.css';
import FormSignIn from '../components/pages/FormSignIn';

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container'>
        <div className='form-content-left'>
        <h1 id="log-in">Log <br></br> In</h1>
          
        </div>
        {!isSubmitted && (
          <FormSignIn submitForm={submitForm} />
        )}
      </div>
    </>
  );
};

export default Form;