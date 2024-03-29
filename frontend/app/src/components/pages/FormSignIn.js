import React from 'react';
import validate from '../validateInfo';
import useForm from '../useForm';
import '../Form.css';
import { Link } from 'react-router-dom';

const FormSignup = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors, handleSignupSubmit, handleLoginSubmit } = useForm(
    submitForm,
    validate
  );

  return (
    <div className='form-content-right'>
      <form onSubmit={handleLoginSubmit} className='form' noValidate>

        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your username'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
       
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password here...'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        
        <button className='form-input-btn' type='submit'>
          Sign in
        </button>
        <span className='form-input-login'>
        <div className='form-input-login'>
            <div class='form-input-login' id="sign-up-again">
            <span>Don't have an account? </span>
             <Link to='/sign-up'>Sign up</Link>
         </div>
         </div>
        </span>
      </form>
    </div>
  );
};

export default FormSignup;