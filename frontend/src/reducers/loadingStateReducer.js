export const Loading = () => {
  return {
    type: 'LOADING',
    data: true
  }
}

export const StopLoading = () => {
  return {
    type: 'STOPLOADING',
    data: false
  }
}


const reducer = ( state = false, action) => {
  switch( action.type){
  case 'LOADING':
    return action.data
  case 'STOPLOADING':
    return action.data
  default:
    return state
  }
}

export default reducer