import React from "react";
import { Modal } from 'react-bootstrap';
import SedevaChatViewer from "../ChatViewer/SedevaChatViewer";
import './SedevaChatModal.css';

class SedevaChatModal extends React.Component {
  
  render() {
    const show = this.props.show;
    return (
		  <Modal show={show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Sedeva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <SedevaChatViewer />
        </Modal.Body>
        <Modal.Footer>
            <span className="span-modal-footer">Global Shared Services Organization</span>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SedevaChatModal