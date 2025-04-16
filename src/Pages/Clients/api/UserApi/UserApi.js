import { getApi } from '../../../../utils/api'

export const searchUsersByEmail = async (email) => {
  const response = await (await getApi()).get(`/api/user/search?email=${email}`)
  return response.data
}
