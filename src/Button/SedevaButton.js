import React from "react";
import { Button } from 'react-bootstrap';
import SedevaChatModal from '../ChatModal/SedevaChatModal';
import './SedevaButton.css';

class SedevaButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({
        show: true,
    });
  };

  hideModal = () => {
    this.setState({ 
        show: false,
    });
  };
  
  render() {
    const show = this.state.show;
    
    return (
        <>
            <Button variant="primary" onClick={this.showModal}>
                Talk to Sedeva
            </Button>

            <SedevaChatModal
                show={show}
                handleClose={this.hideModal} />
        </>
    );
  }
}

export default SedevaButton