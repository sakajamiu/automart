import signUPServices from '../services/signup'
import { errorMessage, successMessage }  from './notification'
import { StopLoading } from './loadingStateReducer'
import { updateUserProfile } from './loginReducer'



export const signUp =  (userDetails) => {
  console.log(userDetails)
  return async dispatch => {
    try {
      const register = await signUPServices.signUp(userDetails)
      dispatch(
        {
          type : 'REGISTER',
          data: register
        }
      )
      dispatch(StopLoading())
      dispatch(successMessage(`you have successfully register your email: ${register.email}, click on sign In to continue`))
    }catch(err){
      dispatch(StopLoading())
      dispatch(errorMessage('invalid email or password'))
    }
  }

}

export const updateUser = (userDetails) => {
  return async dispatch => {
    try{
      const updatedUser = await signUPServices.update(userDetails)
      dispatch(updateUserProfile(updatedUser))
      dispatch({
        type: 'UPDATE-USER',
        data: updatedUser
      })
      dispatch(successMessage('profile picture updated successfully'))
    }catch(err){
      dispatch(errorMessage('network error, please try again later'))
    }
  }
}
const reducer = (state = [], action) => {
  switch(action.type) {
  case 'REGISTER':

    return action.data
  case 'UPDATE-USER':
    return action.data

  default :
    return state
  }
}

export default reducer