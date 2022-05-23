import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk  from 'redux-thunk'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notification'
import signupReducer from './reducers/signUpReducer'
import loadingStateReducer from './reducers/loadingStateReducer'

const reducers = combineReducers({
  login : loginReducer,
  signUp : signupReducer,
  notification : notificationReducer,
  loading: loadingStateReducer,
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export default store