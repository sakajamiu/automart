
export const errorMessage = message => {
  const data = {
    message : message,
    type : 'danger',
  }
  return {
    type: 'ERROR',
    data : data
  }
}

export const successMessage = message => {
  const data = {
    message: message,
    type: 'success'
  }
  return {
    type:'SUCCESS',
    data: data
  }

}
export const clearMessage = () => {
  return {
    type: 'CLEAR',
    data: []
  }
}

const reducer = (state = [], action ) => {
  switch(action.type) {
  case 'ERROR':
    return action.data
  case 'SUCCESS':
    return action.data
  case 'CLEAR':
    return action.data
  default:
    return state
  }

}
export default reducer