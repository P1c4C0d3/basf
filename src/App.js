import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import SedevaButton from './Button/SedevaButton';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {};
    }

  render(){
    return(
      <div className="App">
        <Jumbotron>
        <Container>
          <Row>
            <Col>
              <h1>Virtual Assistance</h1>
              <p>If you are on this page it is because you have probably had an incident working with one of our products, press the button below to meet Sedeva, our virtual assistant, she will help you with the incident record.</p>
            </Col>
            <Col></Col>
          </Row>
        </Container>
        </Jumbotron>
        <Container>
          <Row className=".row-button-row">
            <Col>
              <SedevaButton />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;