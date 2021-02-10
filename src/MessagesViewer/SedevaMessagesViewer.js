import React from "react";
import { Row, Alert, Button } from 'react-bootstrap';
import './SedevaMessagesViewer.css';

class SedevaMessagesViewer extends React.Component {
  constructor(props) {
    super(props);
    
    this.messagesViewer = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  handleClick = (e) => {
    let selectedOption = e.currentTarget.value;
    this.props.handleClickOption(selectedOption);
  }

  scrollToBottom = () => {
    let scrollHeight = this.messagesViewer.current.scrollHeight;
    let height = this.messagesViewer.current.clientHeight;
    let maxScrollTop = scrollHeight - height;
    
    this.messagesViewer.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }

  render() {
    let chat = this.props.dialog.map((msg, index) => {
        return (
          <DialogBox  id={index}
                      handleClickOption={this.handleClick}
                      msgObject={msg.msgObject}
                      timespan={msg.timestamp} />
        );
    });

    return (
        <Row className="row-modal-body row-text-viewer" ref={this.messagesViewer} >
                {chat}
        </Row>
    );
  }
}

function DialogBox(props){
    let divCssClass = props.msgObject.user_message ? "div-chat-alert right" : "div-chat-alert";
    let spanCssClass = props.msgObject.user_message ? "span-time-stamp span-pull-right" : "span-time-stamp";
    let isRespTypeText = props.msgObject.response_type === "text";

    return(
        <div className={divCssClass}>
            <Alert className="chat-alert" key={props.id} variant={props.msgObject.user_message ? "primary" : "secondary"}>{props.msgObject.user_message ? props.msgObject.user_message : (isRespTypeText ? props.msgObject.text : props.msgObject.title)}
            {!props.msgObject.user_message && !isRespTypeText ?
            <div className="div-response-options">
                {props.msgObject.options.map((option) => {
                return (
                    <Button className="option-button" value={option.value.input.text} onClick={props.handleClickOption}>{option.label}</Button>
                );
                })}
            </div>
            : null
            }
            </Alert>
            <span className={spanCssClass}>{props.timespan}</span>
        </div>
    );
}

export default SedevaMessagesViewer