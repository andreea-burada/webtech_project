import { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const useForm = (callback, validate) => {
  let owner = "zeceLaWeb";
  if (localStorage.getItem('username')) {
    owner = localStorage.getItem('username');
  }
  const [values, setValues] = useState({
    name: '',
    owner: owner,
    initials: '',
    slogan: ''
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);

    console.log(values);

    console.log(Object.keys(validate(values)));
    if (Object.keys(validate(values)).length == 0) {
      try {
        await axios.post("http://localhost:8080/api/team/add", values, { withCredentials: true })
        .then((response) => {
          //console.log(response);
          if (response.status == 200) {
            window.location.href = "/..";
          } else if (response.status == 201) {
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
            <p>!!!ERROR: ${response.data.error}</p>
            `;
            root.prepend(error_div);
            }
        })
        .catch((error) => {
          console.log(error.response.data);
          
        });
      }
      catch (error) {
        console.log(error.response.data);
      }
      
    };
  }

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
