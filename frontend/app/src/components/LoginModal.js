import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormSignIn from "../components/pages/FormSignIn";
import FormSuccess from "../components/FormSucces";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginModal(props) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">LOGIN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {!isSubmitted ? (
            <FormSignIn submitForm={submitForm} />
          ) : (
            <FormSuccess />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;
