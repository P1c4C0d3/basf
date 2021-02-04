import React from "react";
import { Button } from 'react-bootstrap';
import SedevaChatModal from '../ChatModal/SedevaChatModal';
import './SedevaButton.css';

class SedevaButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      dialog: [],
      sessionId: null,
      userMessage: '',
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.handleClickSend = this.handleClickSend.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.updateDialogState = this.updateDialogState.bind(this);
    this.setNewSessionId = this.setNewSessionId.bind(this);
  }

  showModal = () => {
    this.setState({
        show: true,
    });
    this.addToDialog(this.state.sessionId, "hi", true);
  };

  hideModal = () => {
    this.setState({ 
        show: false,
        dialog: [],
        userMessage: '',
        sessionId: null,
    });
  };
  
  handleClickSend = () => {
    this.addToDialog(this.state.sessionId, this.state.userMessage);
    this.setState({
      userMessage: ''
    });
  }

  handleKeyDown = (e) =>{
    if (e.key === 'Enter') {
      this.addToDialog(this.state.sessionId, this.state.userMessage);
      this.setState({
        userMessage: ''
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      userMessage: e.target.value 
    });
  }

  updateDialogState = (message, wasUsr) => {
    const currentDialog = this.state.dialog.slice();
    
    let newMessage = {
      text : message, 
      timestamp : getTimeStamp(),
      author : wasUsr ? "usr" : "sed"
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
    
    if(!onInitModal) this.updateDialogState(message, true);
    if(!sessionId) sessionId = await this.setNewSessionId();

    let sedevaResponse = await this.getSedevaResponse(sessionId, message);
    this.updateDialogState(sedevaResponse, false);
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
    response = fetchResult ? fetchResult.output.generic[0].text : "Something went wrong! We've logged the error. Please try again or contact help@application.com and we'll get back to you as soon as possible.";
    
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

  componentDidMount(){
      this.setNewSessionId();
  }
  
  render() {
    const show = this.state.show;
    const dialog = this.state.dialog;
    const usrMessage = this.state.userMessage;
    return (
        <>
            <Button variant="primary" onClick={this.showModal}>
                Talk to Sedeva
            </Button>

            <SedevaChatModal
                show={show}
                dialog={dialog}
                handleClose={this.hideModal}
                handleClickSend={this.handleClickSend}
                handleKeyDown={this.handleKeyDown}
                handleChange={this.handleChange}
                userMessage={usrMessage} />
        </>
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

export default SedevaButton