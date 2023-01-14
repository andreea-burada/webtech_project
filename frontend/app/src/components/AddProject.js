import React from 'react';
import '../components/FormBug.css';
import { Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';

function FormProject() {
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
          <FloatingLabel
          controlId="floatingInput"
          label="Project name"
          className="mb-3">
            <Form.Control size="lg" type="text" placeholder="Project name" />
          </FloatingLabel>          
          <br />

          <FloatingLabel
          controlId="floatingInput"
          label="Repository link"
          className="mb-3">
            <Form.Control size="lg" type="text" placeholder="Repository link" />
          </FloatingLabel>          
          <br />

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description: </Form.Label> 
            <Form.Control as="textarea" rows={3} placeholder="Detailed description of the bug" />
          </Form.Group>
          <br/>
      </>
        <Button variant="secondary" size="lg">
          Add project
        </Button>
          
        </div>
      );
}
  
  export default FormProject;
  
