import React from 'react'
import { Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {  clearMessage } from '../reducers/notification'

const Notification  = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.notification)
  console.log(message)
  if (message.length === 0) {
    return null
  }
  return(
    <div>
      <Alert variant= {message.type}> {message.message}</Alert>
      {
        setTimeout(() => {
          dispatch(clearMessage())
        }, 3000)
      }
    </div>
  )


}

export default Notification