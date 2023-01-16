import React from 'react';
import '../components/FormBug.css';
import { Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';

function EditBug() {
    return (
        <div className='form-content'>
        <Card className="bg-dark text-white">
        <Card.Body>
          <Card.Text>
            <h1 class="display-4">Edit bug</h1>
          </Card.Text>
        </Card.Body>
      </Card>
        <>
          <FloatingLabel
          controlId="floatingInput"
          label="Bug title"
          className="mb-3">
            <Form.Control size="lg" type="text" placeholder="Bug title" />
          </FloatingLabel>          
          <br />

          <FloatingLabel
          controlId="floatingInput"
          label="Assigned to"
          className="mb-3">
            <Form.Control size="lg" type="text" placeholder="Assigned to" />
          </FloatingLabel>
          
          <br />

          <FloatingLabel
          controlId="floatingInput"
          label="Project"
          className="mb-3">
            <Form.Control size="lg" type="text" placeholder="Project" />
          </FloatingLabel>
          
          <br />

          <FloatingLabel
          controlId="floatingInput"
          label="State"
          className="mb-3">
            <Form.Select size="lg" >
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
            <Form.Select size="lg" >
              <option value='MINOR'>MINOR</option>
              <option value='SERIOUS'>SERIOUS</option>
              <option value='SEVER'>SEVER</option>
            </Form.Select>
          </FloatingLabel>
          
          <br />
          
          <Form.Group className="mb-3" >
            <Form.Label>Description: </Form.Label> 
            <Form.Control as="textarea" rows={3} placeholder="Detailed description of the bug" />
          </Form.Group>
        </>

        <Button variant="secondary" size="lg">
          Edit bug
        </Button>   
          
        </div>
      );
}
  
  export default EditBug;
  
