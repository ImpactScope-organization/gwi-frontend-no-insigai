import { getApi } from '../../../utils/api'

export const getGPTModels = async () => {
  const response = await (await getApi()).get(`/api/gpt/models`)
  return response?.data?.result
}
