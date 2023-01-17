import React, { useState, useEffect } from 'react';
import { Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import useForm from './formHandlers/addBugHandler';
import validateInfo from './formHandlers/addBugValidate';
import '../components/FormBug.css';


function AddBug() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    function submitForm() {
      setIsSubmitted(true);
    }

    const { handleChange, handleSubmit, values, errors } = useForm(
      submitForm,
      validateInfo
    );
    return (
        <div className='form-content container-md'>
        <Card className="background-add-bug text-white">
        <Card.Body>
          <Card.Text>
            <h1 class="display-6">Add bug</h1>
          </Card.Text>
        </Card.Body>
      </Card>
        <>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
            controlId="floatingInput"
            label="Bug title"
            className="mb-3">
              <Form.Control size="lg" type="text" placeholder="Bug title" name="name" onChange={handleChange}/>
            </FloatingLabel>
            {errors.name && <p className='form-input-error'>{errors.name}</p>}        
            <br />

            <FloatingLabel
            controlId="floatingInput"
            label="Reporter"
            className="mb-3">
              <Form.Control size="lg" type="text" placeholder="Reporter" value={localStorage.getItem('username')} readOnly="true" disabled/>
            </FloatingLabel>
          
            <br />
            <FloatingLabel
            controlId="floatingInput"
            label="Severity"
            className="mb-3">
              <Form.Select size="lg" name="severity" onChange={handleChange}>
                <option value=''></option>
                <option value='MINOR'>MINOR</option>
                <option value='SERIOUS'>SERIOUS</option>
                <option value='SEVERE'>SEVERE</option>
              </Form.Select>
            </FloatingLabel>
            {errors.severity && <p className='form-input-error'>{errors.severity}</p>}
            
            <br />

            <FloatingLabel
            controlId="floatingInput"
            label="Link"
            className="mb-3">
              <Form.Control size="lg" type="text" placeholder="Link to Commit" name="link" onChange={handleChange}/>
            </FloatingLabel>
            {errors.link && <p className='form-input-error'>{errors.link}</p>}
          
            <br />
            
            <Form.Group className="mb-3" >
              <Form.Label>Description: </Form.Label> 
              <Form.Control as="textarea" rows={3} placeholder="Detailed description of the bug" name="description" onChange={handleChange}/>
            </Form.Group>
            <Button variant="secondary" size="lg" type="submit">
              Add bug
            </Button> 
          </Form>
        </>   
        </div>
      );
}
  
  export default AddBug;
  
