
import carServices from '../services/car'
import { successMessage, errorMessage } from './notification'
export const createCar = (newCar) => {
  return async dispatch => {
    try{
      const car = await carServices.createCar(newCar)
      dispatch(successMessage(`you have successfully post ${car.brand}  ${car.name} for sell`))
      dispatch({
        type: 'CREATE-CAR',
        data: car
      })
    }catch(err){
      dispatch(errorMessage(err.message))
    }
  }
}
export const getAllCar = () => {
  return async dispatch => {
    try{
      const cars = await carServices.getAllCar()
      dispatch({
        type: 'ALL-CARS',
        data: cars
      })
    }catch(err){
      dispatch(errorMessage('network error'))
    }
  }
}
export const deleteCar = (id) => {
  return async dispatch => {
    try {
      await carServices.deleteCar(id)
      dispatch(successMessage('car successfully deleted'))
      dispatch({
        type:'DELETE-CAR',
        data: id
      })
    }catch(err){
      dispatch(errorMessage('netrwork error or car is already deleted'))
    }
  }
}
export const searchCar = (brand) => {
  return{
    type:'SEARCH',
    data: brand
  }
}
export const getClickedCar = (id) => {
  return{
    type:'CLICKED-CAR',
    data: id
  }

}

const reducer = (state = [], action ) => {
  switch(action.type){
  case 'CREATE-CAR':
    return state.concat(action.data)
  case 'ALL-CARS':
    return action.data
  case 'DELETE-CAR':
    return state.filter(state => state.id !== action.data)
  case 'SEARCH':
    return state.filter(state => state.brand.toLowerCase().includes(action.data.toLowerCase()))
  case 'CLICKED-CAR':
    return state.filter(state => state.id === action.data)
  default:
    return state
  }
}

export default reducer