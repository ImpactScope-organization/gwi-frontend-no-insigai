import { getApi } from '../../../../utils/api'

export const searchUsersByEmail = async (email) => {
  const response = await (await getApi()).get(`/api/user/search?email=${email}`)
  return response.data
}

export const updateUser = async (clientUser) => {
  const response = await (await getApi()).put(`/api/user/${clientUser.id}/update`, clientUser)
  return response.data
}
