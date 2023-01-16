import React, { useState } from 'react';
import '../components/AddTeam.css';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';

function AddTeam() {

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
                <FloatingLabel
                    controlId="floatingInput"
                    label="Name"
                    className="mb-3">
                    <Form.Control size="lg" type="text" placeholder="Name" />
                </FloatingLabel>
                <br />

                <FloatingLabel
                    controlId="floatingInput"
                    label="Owner"
                    className="mb-3">
                    <Form.Control size="lg" type="text" defaultValue={localStorage.getItem('username')} disabled readOnly />
                </FloatingLabel>
                <br />

                <FloatingLabel
                    controlId="floatingInput"
                    label="Initials"
                    className="mb-3">
                    <Form.Control size="lg" type="text" placeholder="Initials" maxLength={4} onChange={e => setInitials(e.target.value)}
                        onInput={toInputUppercase} />
                </FloatingLabel>
                <br />

                <FloatingLabel
                    controlId="floatingInput"
                    label="Slogan"
                    className="mb-3">
                    <Form.Control size="lg" type="text" placeholder="Slogan" />
                </FloatingLabel>
                <br />

            </>

            <Button variant="secondary" size="lg">
                Add Team
            </Button>

        </div>
    );
}

export default AddTeam;