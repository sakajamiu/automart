import React, { useEffect } from 'react'
import './App.css'
import LandingPage from './components/landingPage'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Dashboard  from './components/dashboard'
import { LoggedInUser } from './reducers/loginReducer'
import useMediaQuery from './utilities/mediaQuery'

function App() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  console.log(isMobile)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(LoggedInUser())
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route path='/' element ={<LandingPage/>}/>
        <Route path ='/dashboard' element = {<Dashboard/>}/>
      </Routes>
    </Router>

  )
}

export default App
