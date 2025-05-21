import { getApi } from '../../../utils/api'

export const getPromptCategories = async () => {
  const response = await (await getApi()).get(`/api/prompt-category`)
  return response.data
}

export const getRootPromptCategories = async () => {
  const response = await (await getApi()).get(`/api/prompt-category/root`)
  return response.data
}
export const getGroupedPromptCategories = async () => {
  const response = await (await getApi()).get(`/api/prompt-category/grouped`)
  return response.data
}

export const getPromptCategory = async (id) => {
  const response = await (await getApi()).get(`/api/prompt-category/${id}`)
  return response.data
}

export const createPromptCategory = async (promptCategory) => {
  const response = await (await getApi()).post(`/api/prompt-category/create`, promptCategory)
  return response.data
}

export const updatePromptCategory = async (id, promptCategory) => {
  const response = await (await getApi()).put(`/api/prompt-category/update/${id}`, promptCategory)
  return response.data
}

export const deletePromptCategory = async (id) => {
  const response = await (await getApi()).delete(`/api/prompt-category/delete/${id}`)
  return response.data
}
