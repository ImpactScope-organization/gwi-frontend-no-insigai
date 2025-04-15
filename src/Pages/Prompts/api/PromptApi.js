import { getApi } from '../../../utils/api'

export const createPrompt = async (data) => {
  const response = await (
    await getApi()
  ).post(`/api/prompt/create`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const updatePrompt = async (id, data) => {
  const response = await (
    await getApi()
  ).put(`/api/prompt/update/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const testPrompt = async (data) => {
  const response = await (
    await getApi()
  ).post(`/api/prompt/test`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}
export const testExistingPrompt = async (id, data) => {
  const response = await (await getApi()).post(`/api/prompt/test/${id}`, data)
  return response.data
}

export const getPrompt = async (id) => {
  const response = await (await getApi()).get(`/api/prompt/${id}`)
  return response?.data?.result
}

export const getAllPrompts = async () => {
  const response = await (await getApi()).get(`/api/prompt/all`)
  return response?.data?.result
}

export const deletePrompt = async (id) => {
  const response = await (await getApi()).delete(`/api/prompt/delete/${id}`)
  return response?.data?.result
}
