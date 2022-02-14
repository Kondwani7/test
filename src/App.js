import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import './scss/Appstyles.scss';
import getConfig from './config'
import { Navbar, Button, Container, Nav,Row, Col,Card } from 'react-bootstrap';
import Metadata from './components/Metadata';


const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
 return (
   <React.Fragment>
    <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>Near App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav.Link>
          <Button variant="primary" onClick={(window.accountId==='')?login:logout}>
            {(window.accountId==='')?login:window.accountId}
          </Button>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
      <br></br>

    </Navbar>
    {(window.accountId!=='')?
      <Container>
        <Row className="d-flex justify-content-center">
          <Metadata/>
        </Row>
        <Row className="d-flex justify-content-center">Send Token Out</Row>
        <Row className="d-flex justify-content-center">Active Keys</Row>
      </Container>
    :<Card>
      <Card.Header as='h5'>Hello user!</Card.Header>
      <Card.Body>
        <Card.Title>Please Login</Card.Title>
        <Card.Text>
          This Application will not work. Sorry!
        </Card.Text>
        <Button onClick={login}>Login Now</Button>
      </Card.Body>
      </Card>}
   </React.Fragment>
  
  
 )
}
