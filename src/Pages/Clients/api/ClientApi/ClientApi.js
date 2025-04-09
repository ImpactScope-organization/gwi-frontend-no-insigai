import axios from 'axios'
import apiUrl from '../../../../utils/baseURL'

export const createClient = async (client) => {
  const response = await axios.post(`${apiUrl}/api/client/create`, client)
  return response.data
}

export const fetchClientList = async () => {
  const response = await axios.get(`${apiUrl}/api/client`)
  return response.data
}

export const getClient = async (id) => {
  const response = await axios.get(`${apiUrl}/api/client/${id}`)
  return response.data
}

export const updateClient = async (clientId, client) => {
  const response = await axios.put(`${apiUrl}/api/client/${clientId}/update`, client)
  return response.data
}
