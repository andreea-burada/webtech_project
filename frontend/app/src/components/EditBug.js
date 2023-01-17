import React, { useState, useEffect } from 'react';
import { Button} from 'react-bootstrap';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import useForm from "../components/formHandlers/editBugHandler";
import validateInfo from "../components/formHandlers/editBugValidate";

var currentBug = {};

function EditBug() {
  let dump = window.location.href.split('/', 10);
  var project_id = dump[4];
  var id = dump[dump.length - 1];

  console.log(project_id, id);

  const [bug, setBug] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isEditing, setEditing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  function submitForm() {
      setIsSubmitted(true);
    }

  const { handleChange, handleSubmit, values, errors } = useForm(
      submitForm,
      validateInfo
    );

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8080/api/" + project_id + "/bug/" + id, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          currentBug = response.data;
          setBug(response.data);
          setLoading(false);
          
          // set values
          document.getElementById("name").value = currentBug.name;
          document.getElementById("state").value = currentBug.state;
          document.getElementById("severity").value = currentBug.severity;
          document.getElementById("link").value = currentBug.link;
          document.getElementById("solution_link").value = currentBug.solution_link;
          document.getElementById("description").value = currentBug.description;
        });
    } catch (error) {
      console.log("error", error.response.data);
    }
  }, []);

  if (isLoading) {
    return <div className="loading">Loading... </div>;
  }
    if (currentBug.tester == false)
      return (
          <div className='form-content'>
          <Card className="bg-dark text-white">
          <Card.Body>
            <Card.Text>
              <h1 class="display-4">View Bug</h1>
            </Card.Text>
          </Card.Body>
        </Card>
          <>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
            controlId="floatingInput"
            label="Bug title"
            className="mb-3">
              <Form.Control size="lg" type="text" placeholder="Bug title" name="name" id="name" readOnly="true" disabled/>
            </FloatingLabel>          
            <br />

            <FloatingLabel
            controlId="floatingInput"
            label="Assigned to"
            className="mb-3">
              <Form.Control size="lg" type="text" placeholder="Assigned to" name="solver" value={currentBug.solver} readOnly="true" disabled/>
            </FloatingLabel>
            
            <br />

            <FloatingLabel
            controlId="floatingInput"
            label="Project"
            className="mb-3">
              <Form.Control size="lg" type="text" placeholder="Project" value={currentBug.project_id} readOnly="true" disabled/>
            </FloatingLabel>
            
            <br />

            <FloatingLabel
            controlId="floatingInput"
            label="State"
            className="mb-3">
              <Form.Select size="lg" name="state" id="state">
                <option value='NOT SOLVED'>NOT SOLVED</option>
                <option value='IN PROGRESS'>IN PROGRESS</option>
                <option value='IN REVIEW'>IN REVIEW</option>
                <option value='SOLVED'>SOLVED</option>
              </Form.Select>
            </FloatingLabel>
            
            <br />
            <FloatingLabel
            controlId="floatingInput"
            label="Severity"
            className="mb-3">
              <Form.Select size="lg" name="severity" id="severity" readOnly="true" disabled>
                <option value='MINOR'>MINOR</option>
                <option value='SERIOUS'>SERIOUS</option>
                <option value='SEVERE'>SEVERE</option>
              </Form.Select>
            </FloatingLabel>
            
            <br />

            <FloatingLabel
              controlId="floatingInput"
              label="Link"
              className="mb-3">
                <Form.Control size="lg" type="text" placeholder="Link to Commit" id="link" name="link" onChange={handleChange} readOnly="true" disabled/>
              </FloatingLabel>
              {errors.link && <p className='form-input-error'>{errors.link}</p>}
            
            <br />

            <FloatingLabel
              controlId="floatingInput"
              label="Solution Link"
              className="mb-3">
                <Form.Control size="lg" type="text" placeholder="Link to Commit" id="solution_link" name="solution_link" onChange={handleChange}/>
              </FloatingLabel>
              {errors.solution_link && <p className='form-input-error'>{errors.solution_link}</p>}
            
            <br />
            
            <Form.Group className="mb-3">
              <Form.Label>Description: </Form.Label> 
              <Form.Control as="textarea" rows={3} placeholder="Detailed description of the bug" id="description" name="description" />
            </Form.Group>
            <Button variant="secondary" size="lg" type="submit">
              Save
            </Button>
            </Form>
          </>

            
            
          </div>
        );
    else
      return (
        <div className='form-content'>
        <Card className="bg-dark text-white">
        <Card.Body>
          <Card.Text>
            <h1 class="display-4">View Bug</h1>
          </Card.Text>
        </Card.Body>
      </Card>
        <>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
          controlId="floatingInput"
          label="Bug title"
          className="mb-3">
            <Form.Control size="lg" type="text" placeholder="Bug title" name="name" id="name" />
          </FloatingLabel>          
          <br />

          <FloatingLabel
          controlId="floatingInput"
          label="Assigned to"
          className="mb-3">
            <Form.Control size="lg" type="text" placeholder="Assigned to" name="solver" value={currentBug.solver} readOnly="true" disabled/>
          </FloatingLabel>
          
          <br />

          <FloatingLabel
          controlId="floatingInput"
          label="Project"
          className="mb-3">
            <Form.Control size="lg" type="text" placeholder="Project" value={currentBug.project_id} readOnly="true" disabled/>
          </FloatingLabel>
          
          <br />

          <FloatingLabel
          controlId="floatingInput"
          label="State"
          className="mb-3">
            <Form.Select size="lg" name="state" id="state" readOnly="true" disabled>
              <option value='NOT SOLVED'>NOT SOLVED</option>
              <option value='IN PROGRESS'>IN PROGRESS</option>
              <option value='IN REVIEW'>IN REVIEW</option>
              <option value='SOLVED'>SOLVED</option>
            </Form.Select>
          </FloatingLabel>
          
          <br />
          <FloatingLabel
          controlId="floatingInput"
          label="Severity"
          className="mb-3">
            <Form.Select size="lg" name="severity" id="severity">
              <option value='MINOR'>MINOR</option>
              <option value='SERIOUS'>SERIOUS</option>
              <option value='SEVERE'>SEVERE</option>
            </Form.Select>
          </FloatingLabel>
          
          <br />

          <FloatingLabel
            controlId="floatingInput"
            label="Link"
            className="mb-3">
              <Form.Control size="lg" type="text" placeholder="Link to Commit" id="link" name="link" onChange={handleChange}/>
            </FloatingLabel>
            {errors.link && <p className='form-input-error'>{errors.link}</p>}
          
          <br />

          <FloatingLabel
            controlId="floatingInput"
            label="Solution Link"
            className="mb-3">
              <Form.Control size="lg" type="text" placeholder="Link to Commit" id="solution_link" name="solution_link" onChange={handleChange} readOnly="true" disabled/>
            </FloatingLabel>
            {errors.solution_link && <p className='form-input-error'>{errors.solution_link}</p>}
          
          <br />
          
          <Form.Group className="mb-3">
            <Form.Label>Description: </Form.Label> 
            <Form.Control as="textarea" rows={3} placeholder="Detailed description of the bug" id="description" name="description" />
          </Form.Group>
          <Button variant="secondary" size="lg" type="submit">
            Save
          </Button>
          </Form>
        </>

           
          
        </div>
      );
}
  
  export default EditBug;
  
