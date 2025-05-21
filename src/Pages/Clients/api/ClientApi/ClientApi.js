import { getApi } from '../../../../utils/api'

export const createClient = async (client) => {
  const response = await (await getApi()).post(`/api/client/create`, client)
  return response.data
}

export const fetchClientList = async () => {
  const response = await (await getApi()).get(`/api/client`)
  return response.data
}

export const getClient = async (id) => {
  const response = await (await getApi()).get(`/api/client/${id}`)
  return response.data
}

export const updateClient = async (clientId, client) => {
  const response = await (await getApi()).put(`/api/client/${clientId}/update`, client)
  return response.data
}
