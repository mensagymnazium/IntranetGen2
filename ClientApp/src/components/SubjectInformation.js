import React from "react";
import { Button, Modal, ButtonToolbar } from "react-bootstrap";

export const SubjectInformation = props => {
  const { onHide, show } = props;
  const { name, description, teacher } = props.selectedSubject;
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{teacher}</h4>
        <p>{description}</p>
      </Modal.Body>
      <Modal.Footer>
        <ButtonToolbar>
          <Button variant="success" className="mr">
            Zapsat
          </Button>
          <Button onClick={onHide}>Zpět</Button>
        </ButtonToolbar>
      </Modal.Footer>
    </Modal>
  );
};
