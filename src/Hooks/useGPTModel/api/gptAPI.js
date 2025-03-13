import axios from 'axios'
import apiUrl from '../../../utils/baseURL'

export const getGPTModels = async () => {
  const response = await axios.get(`${apiUrl}/api/gpt/models`)
  return response?.data?.result
}
