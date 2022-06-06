import axios from 'axios'

const baseUrl = '/api/cars'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllCar = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createCar = async(newCar) => {
  const config ={
    headers: {
      Authorization: token
    }
  }
  const response =  await axios.post(baseUrl,newCar,config)
  return response.data
}

const deleteCar = async(id) => {
  const config = {
    headers: {
      Authorization : token
    }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default{
  setToken,
  getAllCar,
  createCar,
  deleteCar
}