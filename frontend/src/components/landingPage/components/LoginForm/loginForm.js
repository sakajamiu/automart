import React, { useState } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import styles from './index.module.css'
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Login } from '../../../../reducers/loginReducer'
import { Loading } from '../../../../reducers/loadingStateReducer'
export const signIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const loading = useSelector(state => state.loading)
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
  return(
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
}