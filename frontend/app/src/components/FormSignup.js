import React, { useState } from 'react';
import './Form.css';
import FormSignUp from './pages/FormSignUp';
import FormSuccess from './FormSucces';

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container-sign-up'>
        <div className='form-content-left'>

        </div>
        {!isSubmitted ? (
          <FormSignUp submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
      </div>
    </>
  );
};

export default Form;