import React from 'react';
import { Row, Alert, InputGroup, FormControl, Button } from 'react-bootstrap';
import './SedevaChatViewer.css';

function DialogBox(props){
  let divCssClass = (props.author) === "usr" ? "div-chat-alert right" : "div-chat-alert";
  let spanCssClass = (props.author) === "usr" ? "span-time-stamp span-pull-right" : "span-time-stamp";
  
  return(
    <div className={divCssClass}>
        <Alert className="chat-alert" key={props.id} variant={props.author === "sed" ? "secondary" : "primary"}>{props.text}</Alert>
        <span className={spanCssClass}>{props.timespan}</span>
    </div>
  );
}

class SedevaChatViewer extends React.Component {
  constructor(props) {
    super(props);

    this.messageInput = React.createRef();
    this.messagesViewer = React.createRef();

    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    this.messageInput.current.focus();
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    let scrollHeight = this.messagesViewer.current.scrollHeight;
    let height = this.messagesViewer.current.clientHeight;
    let maxScrollTop = scrollHeight - height;
    
    this.messagesViewer.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    let chat = this.props.dialog.map((msg, index) => {
      return (
        <DialogBox  id={index}
                    author={msg.author}
                    text={msg.text}
                    timespan={msg.timestamp} />
      );
    });

    return (
    <Row className="row-modal-body">
        <Row
          className="row-modal-body row-text-viewer"
          ref={this.messagesViewer} >
            {chat}
        </Row>
        <Row className="row-modal-body row-input-group">
            <InputGroup>
            <FormControl
                ref={this.messageInput}
                value={this.props.userMessage} 
                onChange={this.props.handleChange} 
                onKeyDown={this.props.handleKeyDown}
                placeholder="Your Message"
                aria-label="Your Message" />
            <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.props.handleClickSend} disabled={!this.props.userMessage.trim()}>Send</Button>
            </InputGroup.Append>
            </InputGroup>
        </Row>
    </Row>
    );
  }

}

export default SedevaChatViewer;