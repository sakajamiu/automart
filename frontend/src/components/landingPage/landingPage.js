import React, { useState } from 'react'
import {
  Row,
  Col,
  Navbar,
  Container,
  Nav,
  Form ,
  Button,
  Spinner
} from 'react-bootstrap'
import logo from '../../images/logo.svg'
import styles from './index.module.css'
import {
  FaEnvelope,
  FaUser,
  FaLock,
  FaSignInAlt
} from 'react-icons/fa'
import { signUp } from '../../reducers/signUpReducer'
import { Login } from '../../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../reducers/loadingStateReducer'

import Notification from '../../utilities/alert'



export const LandingPage = () => {
  const [signUpForm, setSignupForm] = useState(true)
  const [email, setEmail] = useState('')
  const [ name, setName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loginUser = useSelector(state => state.login)
  const loading = useSelector(state => state.loading)
  const addUser = (event) => {
    event.preventDefault()
    const User = {
      email : email,
      name: name,
      password: password
    }

    dispatch(signUp(User))
    dispatch(Loading())
    setEmail('')
    setName('')
    setPassword('')
  }

  const login = (event) => {
    event.preventDefault()
    const userDetails = {
      email: email,
      password: password
    }
    dispatch(Login(userDetails))
    dispatch(Loading())
    setEmail('')
    setPassword('')
  }
  const Register = () => (
    <Form  className={styles.form} onSubmit = {addUser}>
      <Form.Group>
        <Form.Label className={styles.label}>Email</Form.Label>
        <div>
          <FaEnvelope  className={styles.icon}/>
          <Form.Control
            type='email'
            placeholder='please enter your email'
            className={styles.input}
            value = {email}
            onChange ={(e) => setEmail(e.target.value)}
          />
          <Form.Text className={styles.error_message}>please enter a valid email e.g user@domain.ng</Form.Text>
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label className={styles.label}>Name</Form.Label>
        <div>
          <FaUser className={styles.icon}/>
          <Form.Control
            type='name'
            placeholder='please enter your name'
            className={styles.input}
            value = {name}
            onChange = {(e) => setName(e.target.value)}
          />
        </div>
      </Form.Group>
      <Form.Group>

        <Form.Label className={styles.label}>Password</Form.Label>
        <div>
          <FaLock className={styles.icon}/>
          <Form.Control
            type='password'
            placeholder='please enter your password'
            className={styles.input}
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
          />
        </div>
      </Form.Group>
      {
        loading?<Spinner variant='success' animation='border' className={styles.button}/> :
          <Button type ='submit' className={styles.button}><FaSignInAlt/> Sign Up</Button>
      }

    </Form>
  )
  const signIn = () => (
    <Form  className={styles.form} onSubmit = {login}>
      <Form.Group>
        <Form.Label className={styles.label}>Email</Form.Label>
        <div>
          <FaEnvelope  className={styles.icon}/>
          <Form.Control
            type='email'
            placeholder='please enter your email'
            className={styles.input}
            value ={email}
            onChange = {(e) => setEmail(e.target.value)}
          />
          <Form.Text className={styles.error_message}>please enter a valid email e.g user@domain.ng</Form.Text>
        </div>
      </Form.Group>

      <Form.Group>

        <Form.Label className={styles.label}>Password</Form.Label>
        <div>
          <FaLock className={styles.icon}/>
          <Form.Control
            type='password'
            placeholder='please enter your password'
            className={styles.input}
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
          />
        </div>
      </Form.Group>
      {
        loading?<Spinner variant='success' animation='border' className={styles.button}/> :
          <Button type ='submit' className={styles.button}><FaSignInAlt/> Sign In</Button>
      }

    </Form>
  )
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

          <Col sm ={4} >
            <div className={styles.column}>
              <h1 > Buy or Sell Cars</h1>
              <p className={styles.p}>Sign up or login now to start selling or buying cars from the comfort of your home!</p>
            </div>
          </Col>
          <Col sm={4}></Col>
          <Col sm ={4}>
            { signUpForm ?Register() : signIn()}
          </Col>
        </Row>
      </div>
      {
        loginUser !== null ? navigate('/dashboard'): null
      }
    </div>
  )
}