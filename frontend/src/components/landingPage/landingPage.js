import React, { useState, useEffect } from 'react'
import { Row, Col,Navbar,Container,Nav } from 'react-bootstrap'
import logo from '../../images/logo.svg'
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Notification from '../../utilities/alert'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'

export const LandingPage = () => {
  const [signUpForm, setSignupForm] = useState(true)
  const navigate = useNavigate()
  const loginUser = useSelector(state => state.login)
  useEffect(() => {
    if(loginUser ){
      navigate('/dashboard')
    }
  })

  return(

    <div className={styles.div}>
      <Notification/>
      <div className={styles.card}>
        <Navbar expand = "md">
          <Container>
            <Navbar.Brand >
              <img src ={logo} alt ='logo'/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls = "basic-navbar-nav"/>
            <Navbar.Collapse   id="basic-navbar-nav">
              <Nav className = 'me-auto'>
              </Nav>
              <Nav className = "justify-content-end" >
                <Nav.Link to='/sign In'id = 'link'  onClick ={() => setSignupForm(false)}>Sign In</Nav.Link>
                <Nav.Link to='/sign up'id = 'link' onClick ={() => setSignupForm(true)} >Sign Up</Nav.Link>
              </Nav>
            </Navbar.Collapse>

          </Container>
        </Navbar>
        <Row>

          <Col sm ={6} >
            <div className={styles.column}>
              <h1 > Buy or Sell Cars</h1>
              <p className={styles.p}>Sign up or login now to start selling or buying cars from the comfort of your home!</p>
            </div>
          </Col>
          <Col sm={2}></Col>
          <Col sm ={4}>
            { signUpForm ?<SignUpForm/> : <LoginForm/>}
          </Col>
        </Row>
      </div>

    </div>
  )
}