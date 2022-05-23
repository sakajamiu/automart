import signUPServices from '../services/signup'
import { errorMessage, successMessage }  from './notification'
import { StopLoading } from './loadingStateReducer'




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
      dispatch(errorMessage(err.message))
    }
  }

}
const reducer = (state = [], action) => {
  switch(action.type) {
  case 'REGISTER':

    return action.data
  default :
    return state
  }
}

export default reducer