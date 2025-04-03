import axios from 'axios'
import apiUrl from '../../../../utils/baseURL'

export const createClientUser = async (clientId, client) => {
  const response = await axios.post(`${apiUrl}/api/client/${clientId}/user/create`, client)
  return response.data
}
