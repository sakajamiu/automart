import loginService from '../services/login'
import { errorMessage } from './notification'
import { StopLoading } from './loadingStateReducer'


export const Login = (userCredentials) => {
  return async dispatch => {
    try{
      const loginUser = await loginService.login(userCredentials)
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
  const userData = JSON.parse(user)
  return {
    type: 'LOGGEDINUSER',
    data: userData
  }
}

const reducer = (state = null, action ) => {
  switch(action.type) {
  case 'LOGIN':
    localStorage.setItem('automart-app', JSON.stringify(action.data))
    return action.data
  case 'LOGGEDINUSER':
    return action.data
  default :
    return state
  }
}

export default reducer