import React, { useState, useEffect } from 'react';
import '../components/FormBug.css';
import { Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import useForm from './formHandlers/addProjectHandler';
import validateInfo from './formHandlers/addProjectValidate';

function FormProject() {
  const [isSubmitted, setIsSubmitted] = useState(false);
    function submitForm() {
        setIsSubmitted(true);
      }

    const { handleChange, handleSubmit, values, errors } = useForm(
        submitForm,
        validateInfo
      );

    return (
        <div className='form-content'>
        <Card className="bg-dark text-white">
        <Card.Body>
          <Card.Text>
            <h1 class="display-4">Add project</h1>
          </Card.Text>
        </Card.Body>
      </Card>

      <>
      <Form onSubmit={handleSubmit} noValidate>
          <FloatingLabel
          controlId="floatingInput"
          label="Project name"
          className="mb-3">
            <Form.Control size="lg" type="text" placeholder="Project name" name="name" onChange={handleChange}/>
          </FloatingLabel>
          {errors.name && <p className='form-input-error'>{errors.name}</p>}       
          <br />

          <FloatingLabel
          controlId="floatingInput"
          label="Repository link"
          className="mb-3">
            <Form.Control size="lg" type="text" placeholder="Repository link" name="repo_link" onChange={handleChange}/>
          </FloatingLabel>
          {errors.repo_link && <p className='form-input-error'>{errors.repo_link}</p>}       
          <br />

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description: </Form.Label> 
            <Form.Control as="textarea" rows={3} placeholder="Detailed description of the bug" name="description" onChange={handleChange}/>
          </Form.Group>
          <br/>
          <Button variant="secondary" size="lg" type="submit">
            Add Project
          </Button>
        </Form>
      </>
        </div>
      );
}
  
  export default FormProject;
  
