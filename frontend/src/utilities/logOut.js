import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPowerOff } from 'react-icons/fa'
import { SignOut } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import useMediaQuery from './mediaQuery'

const LogOut = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const logOut = () => {
    dispatch(SignOut())
    localStorage.removeItem('automart-app')
    navigate('/')
  }

  return (
    <>{
      isMobile? <p onClick={() => logOut()}> Log Out </p>
        :
        <FaPowerOff onClick={() => logOut()} style ={{ color: '#28a745', width: '25px', marginTop: '5px', marginRight:'15px', cursor:'pointer' }}/>
    }

    </>
  )
}

export default LogOut