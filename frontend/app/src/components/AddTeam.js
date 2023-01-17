import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import useForm from './formHandlers/addTeamHandler';
import validateInfo from './formHandlers/addTeamValidate';
import '../components/AddTeam.css';
import '../components/Errors.css';

function AddTeam() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    function submitForm() {
        setIsSubmitted(true);
      }

    const { handleChange, handleSubmit, values, errors } = useForm(
        submitForm,
        validateInfo
      );

    const [initials, setInitials] = useState("");

    const toInputUppercase = e => {
        e.target.value = ("" + e.target.value).toUpperCase();
    };


    return (
        <div className='form-content'>
            <Card className="bg-dark text-white">
                <Card.Body>
                    <Card.Text>
                        <h1 class="display-6 big-title">Add Team</h1>
                    </Card.Text>
                </Card.Body>
            </Card>
            <>
                <Form onSubmit={handleSubmit} noValidate>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name"
                        className="mb-3">
                        <Form.Control name="name" size="lg" type="text" placeholder="Name" onChange={handleChange}/>
                    </FloatingLabel>
                    {errors.name && <p className='form-input-error'>{errors.name}</p>}

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Owner"
                        className="mb-3">
                        <Form.Control name="owner" size="lg" type="text" defaultValue={localStorage.getItem('username')} disabled readOnly/>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Initials"
                        className="mb-3">
                        <Form.Control name="initials" size="lg" type="text" placeholder="Initials" maxLength={4} onChange={e => {setInitials(e.target.value); handleChange(e);}}
                            onInput={toInputUppercase} />
                    </FloatingLabel>
                    {errors.initials && <p className='form-input-error'>{errors.initials}</p>}

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Slogan"
                        className="mb-3">
                        <Form.Control name="slogan" size="lg" type="text" placeholder="Slogan" onChange={handleChange}/>
                    </FloatingLabel>
                    <Button variant="secondary" size="lg" type="submit">
                        Add Team
                    </Button>
                </Form>
            </>

            

        </div>
    );
}

export default AddTeam;