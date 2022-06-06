import React from 'react'
import { Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {  clearMessage } from '../reducers/notification'

const Notification  = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.notification)
  if (message.length === 0) {
    return null
  }
  setTimeout(() => {
    dispatch(clearMessage())
  }, 3000)
  return(
    <Alert variant= {message.type}> {message.message}</Alert>

  )


}

export default Notification