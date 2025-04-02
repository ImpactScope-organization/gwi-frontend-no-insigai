import axios from 'axios'
import apiUrl from '../../../utils/baseURL'

export const createClient = async (client) => {
  const response = await axios.post(`${apiUrl}/api/client/create`, client)
  return response.data
}
