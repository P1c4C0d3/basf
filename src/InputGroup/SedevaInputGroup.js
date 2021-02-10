import React from "react";
import { Row, InputGroup, FormControl, Button } from 'react-bootstrap';
import './SedevaInputGroup.css';

class SedevaInputGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        userMessage: '',
      };
      
    this.messageInput = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

  handleClick = () => {
    let usrMessage = this.state.userMessage;
    this.props.handleClickSend(usrMessage);
    this.setState({
        userMessage: '' 
      });
  }

  handleKeyDown = (e) =>{
    if (e.key === 'Enter') {
        let usrMessage = this.state.userMessage;
        this.props.handleKeyDownSend(usrMessage);
        this.setState({
            userMessage: ''
        });
    }
  }

  handleChange = (e) => {
    let usrMessage = e.target.value;
    this.setState({
      userMessage: usrMessage 
    });
  }
  
  componentDidUpdate(prevProps, prevState) {
    this.messageInput.current.focus();
  }

  render() {
    return (
        <Row className="row-modal-body row-input-group">
            <InputGroup>
                <FormControl
                    ref={this.messageInput}
                    value={this.state.userMessage}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    placeholder="Your Message"
                    aria-label="Your Message" />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={this.handleClick} disabled={!this.state.userMessage.trim()}>Send</Button>
                </InputGroup.Append>
            </InputGroup>
        </Row>
    );
  }
}

export default SedevaInputGroup