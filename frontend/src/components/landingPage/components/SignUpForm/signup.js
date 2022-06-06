import React, { useState } from 'react'
import { FaEnvelope, FaLock, FaUser, FaSignInAlt } from 'react-icons/fa'
import { Form, Button, Spinner } from 'react-bootstrap'
import styles from './index.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Loading } from '../../../../reducers/loadingStateReducer'
import  { signUp } from '../../../../reducers/signUpReducer'


export const Register = () => {
  const [email, setEmail] = useState('')
  const [ name, setName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
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

  return(
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
}