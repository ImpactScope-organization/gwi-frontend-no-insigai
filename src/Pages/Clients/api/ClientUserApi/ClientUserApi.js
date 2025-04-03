import axios from 'axios'
import apiUrl from '../../../../utils/baseURL'

export const createClientUser = async (clientId, client) => {
  const response = await axios.post(`${apiUrl}/api/client/${clientId}/user/create`, client)
  return response.data
}

export const fetchClientUserList = async (clientId) => {
  const response = await axios.get(`${apiUrl}/api/client/${clientId}/user`)
  return response.data
}

export const updateClientUser = async (clientUser) => {
  const response = await axios.put(
    `${apiUrl}/api/client/${clientUser.clientId}/user/${clientUser.id}/update`,
    clientUser
  )
  return response.data
}
