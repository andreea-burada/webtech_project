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

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
    
    document.querySelector('form').submit();
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:8080/login", values, { withCredentials: true })
      .then((response) => {
        //console.log(response);
        if (response.status == 200) {
          localStorage.setItem('username', values.username);
          window.location.href = "../";
        }
      });
      //document.querySelector('form').submit();
    }
    catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors, handleLoginSubmit };
};

export default useForm;
