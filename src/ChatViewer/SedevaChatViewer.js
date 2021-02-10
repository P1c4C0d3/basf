import React from 'react';
import { Row } from 'react-bootstrap';
import SedevaMessagesViewer from '../MessagesViewer/SedevaMessagesViewer.js';
import SedevaInputGroup from '../InputGroup/SedevaInputGroup.js'
import './SedevaChatViewer.css';
class SedevaChatViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: [],
      sessionId: null,
      userMessage: '',
    };

    this.handleSend = this.handleSend.bind(this);

    this.updateDialogState = this.updateDialogState.bind(this);
    this.setNewSessionId = this.setNewSessionId.bind(this);
  }

  handleSend = (msg) => {
    this.addToDialog(this.state.sessionId, msg);
  }

  updateDialogState = (message) => {
    const currentDialog = this.state.dialog.slice();
    
    let newMessage = {
      msgObject : message, 
      timestamp : getTimeStamp()
    };
    
    this.setState({
      dialog: currentDialog.concat([newMessage]),
    });
  }

  setNewSessionId = async () => {
    let sessionId = await this.getSessionId();
    
    this.setState({
      sessionId: sessionId,
    });

    return sessionId;
  }

  fetchRetry = async (url, options = {}, retries = 3) => {
    return await fetch(url, options)
      .then(res => {
        if (res.ok){
          return res.json();
        }
        if (retries > 0) {
          return this.fetchRetry(url, options, retries - 1);
        } else {
          throw new Error(`Error ${res.status} : ${res.statusText}`);
        }
      })
      .catch(
           (error) => {
             console.error(
              `There has been a problem with your fetch operation, ${error.message}`);
            });
  }
  
  addToDialog = async (sessionId, message, onInitModal = false) => {
    message = message.trim();
    
    if(!onInitModal) this.updateDialogState({user_message: message});
    if(!sessionId) sessionId = await this.setNewSessionId();

    let sedevaResponse = await this.getSedevaResponse(sessionId, message);

    sedevaResponse.forEach(msgObj => this.updateDialogState(msgObj));
  }

  getSedevaResponse = async (sessionId, message) => {
    let response = null;
    
    let receipeURL =  'https://gateway-lon.watsonplatform.net/assistant/api/v2/assistants/62a85bcf-487e-4f42-a3bc-cea06fe818c3/sessions/' + sessionId + '/message?version=2019-02-28';
    let postBody = {
      input: {
        text: message
      }
    };
    let requestMetadata = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YXBpa2V5OmVmSUdTUE0yZWdWTHdpZHdVR0FxSmFNYWZkajNmYmtBaGRjWjl6OENnLUZj'
      },
      body: JSON.stringify(postBody)
    };
    let fetchResult = await this.fetchRetry(receipeURL, requestMetadata, 2);
    response = fetchResult ?
                fetchResult.output.generic :
                [{
                  response_type: "text",
                  text: "Something went wrong! We've logged the error. Please try again or contact help@application.com and we'll get back to you as soon as possible."
                }];
    
    return response;
  }

  getSessionId = async () => {
    let sessionId = null;
    
    let recipeUrl = 'https://gateway-lon.watsonplatform.net/assistant/api/v2/assistants/62a85bcf-487e-4f42-a3bc-cea06fe818c3/sessions?version=2019-02-28';
    let requestMetadata = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YXBpa2V5OmVmSUdTUE0yZWdWTHdpZHdVR0FxSmFNYWZkajNmYmtBaGRjWjl6OENnLUZj'
      }
    };
  
    let fetchResult = await this.fetchRetry(recipeUrl, requestMetadata, 2);
    if (fetchResult) sessionId = fetchResult.session_id;
  
    return sessionId;
  }

  componentDidMount() {
    this.setNewSessionId();
    this.addToDialog(this.state.sessionId, "hi", true);
  }

  render() {
    return (
    <Row className="row-modal-body">
        <SedevaMessagesViewer
          dialog={this.state.dialog}
          handleClickOption={this.handleSend} />
        
        <SedevaInputGroup
          handleClickSend={this.handleSend}
          handleKeyDownSend={this.handleSend} />
    </Row>
    );
  }

}

function getTimeStamp() {
  let months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let currentDatetime = new Date()
  let formatedDatetime = months[currentDatetime.getMonth()] + " " + addZero(currentDatetime.getDate()) + " " + addZero(currentDatetime.getHours()) + ":" + addZero(currentDatetime.getMinutes());

  return formatedDatetime;
}

function addZero(i) {
  if (i < 10) {
      i = "0" + i;
  }
  return i;
}

export default SedevaChatViewer;