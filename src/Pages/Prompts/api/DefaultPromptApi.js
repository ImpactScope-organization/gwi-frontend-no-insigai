import { getApi } from '../../../utils/api'

export const getAllDefaultPrompts = async () => {
  const response = await (await getApi()).get(`/api/default-prompt`)
  return response?.data?.result
}

export const setDefaultPrompt = async (promptToSet) => {
  const response = await (await getApi()).post(`/api/default-prompt/set`, promptToSet)
  return response?.data?.result
}
