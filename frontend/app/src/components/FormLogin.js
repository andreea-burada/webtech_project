import React, { useState } from 'react';
import './Form.css';
import FormSignIn from '../components/pages/FormSignIn';
import FormSuccess from '../components/FormSucces';

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container'>
        <div className='form-content-left'>
          
        </div>
        {!isSubmitted ? (
          <FormSignIn submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
      </div>
    </>
  );
};

export default Form;