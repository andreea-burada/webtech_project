import { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    firstname:'',
    lastname:'',
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
    
    document.querySelector('form').submit();
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);

    console.log(Object.keys(validate(values)));
    try {
      await axios.post("http://localhost:8080/register", values, { withCredentials: true })
      .then((response) => {
        //console.log(response);
        if (response.status == 200) {
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        // add error alert box
        let root = window.document.getElementById("root");
        let errors = window.document.getElementsByClassName("error-container");
        if (errors) {
          for(let errorElement of errors) {
            errorElement.remove();
          }
        }
        let error_div = window.document.createElement("div");
        error_div.className = "error-container";
        error_div.innerHTML = `
        <p>!!!ERROR: ${error.response.data.message}</p>
        `;
        root.prepend(error_div);
      });
      //document.querySelector('form').submit();
    }
    catch (error) {
      console.log(error.response.data);
    }
    
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
    

    console.log(Object.keys(validate(values)));
    try {
      await axios.post("http://localhost:8080/login", values, { withCredentials: true })
      .then((response) => {
        //console.log(response);
        if (response.status == 200) {
          localStorage.setItem('username', values.username);
          window.location.href = "../";
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        // add error alert box
        let root = window.document.getElementById("root");
        let errors = window.document.getElementsByClassName("error-container");
        if (errors) {
          for(let errorElement of errors) {
            errorElement.remove();
          }
        }
        let error_div = window.document.createElement("div");
        error_div.className = "error-container";
        error_div.innerHTML = `
        <p>!!!ERROR: ${error.response.data.message}</p>
        `;
        root.prepend(error_div);
      });
      //document.querySelector('form').submit();
    }
    catch (error) {
      console.log(error.response.data);
    }
    
  };

  return { handleChange, handleSubmit, values, errors, handleSignupSubmit, handleLoginSubmit };
};

export default useForm;
