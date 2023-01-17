import { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    name: '',
    severity: '',
    description: '',
    link: '',
    solution_link: '',
    state: ''
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

    // get values from inputs
    values.name = document.getElementById("name").value;
    values.state = document.getElementById("state").value;
    values.severity = document.getElementById("severity").value;
    values.link = document.getElementById("link").value;
    values.solution_link = document.getElementById("solution_link").value;
    values.description = document.getElementById("description").value;

    setErrors(validate(values));
    setIsSubmitting(true);

    console.log(values);

    // get project id
    let project_id = window.location.href.split('/', 10)[4];
    let bug_id = window.location.href.split('/', 10)[6];
    console.log(project_id, bug_id);

    console.log(values);

    console.log(Object.keys(validate(values)));
    if (Object.keys(validate(values)).length == 0) {
      try {
        await axios.patch("http://localhost:8080/api/" + project_id + "/bug/" + bug_id, values, { withCredentials: true })
        .then((response) => {
          //console.log(response);
          if (response.status == 200) {
            let errors = window.document.getElementsByClassName("error-container");
            if (errors) {
              for(let errorElement of errors) {
                errorElement.remove();
              }
            }
            window.location.reload();
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
    }
  }

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;