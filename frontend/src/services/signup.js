import axios from 'axios'

const baseUrl = '/api/users'
let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const signUp = async user => {
  console.log(user)
  const response = await axios.post(baseUrl, user)
  return response.data
}
const update = async user => {
  const config ={
    headers: {
      Authorization: token
    }
  }
  const response = await axios.put(baseUrl, user, config)
  return response.data
}

export default { signUp, setToken, update }