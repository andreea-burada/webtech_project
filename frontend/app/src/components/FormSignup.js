import React, { useState } from 'react';
import './Form.css';
import './Errors.css';
import FormSignUp from './pages/FormSignUp';

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container-sign-up'>
        <div className='form-content-left'>
          <h1 id="sign-up">Sign <br></br>Up</h1>

        </div>
        {!isSubmitted && (
          <FormSignUp submitForm={submitForm} />
        ) }
      </div>
    </>
  );
};

export default Form;