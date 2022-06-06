import loginService from '../services/login'
import { errorMessage } from './notification'
import { StopLoading } from './loadingStateReducer'
import carService from '../services/car'
import signUpService from '../services/signup'


export const Login = (userCredentials) => {
  return async dispatch => {
    try{
      const loginUser = await loginService.login(userCredentials)
      carService.setToken(loginUser.token)
      signUpService.setToken(loginUser.token)
      localStorage.setItem('automart-app', JSON.stringify(loginUser))
      dispatch(StopLoading())
      dispatch({
        type: 'LOGIN',
        data: loginUser
      })


    }catch(err){
      dispatch(StopLoading())
      dispatch(errorMessage('invalid email or password' ))
    }
  }
}
export const LoggedInUser = () => {
  const user = localStorage.getItem('automart-app')
  if(user !== null || undefined){
    const userData = JSON.parse(user)
    carService.setToken(userData.token)
    signUpService.setToken(userData.token)

    return {
      type: 'LOGGEDINUSER',
      data: userData
    }
  }
  return{
    type:'NO-USER',
    data: null
  }
}
export const SignOut = () => {
  return{

    type: 'LOG-OUT',
    data: null
  }
}
export const updateUserProfile = (userDetails) => {
  return {
    type: 'UPDATE-USER-PROFILE',
    data: userDetails
  }
}
const reducer = (state = null, action ) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGGEDINUSER':
    return action.data
  case 'NO-USER':
    return action.data
  case 'LOG-OUT':
    return action.data
  case 'UPDATE-USER-PROFILE':
    state = { ...state, photo : action.data.photo }
    localStorage.setItem('automart-app', JSON.stringify(state))
    return state
  default :
    return state
  }
}

export default reducer