import { getApi } from '../../../utils/api'

export const getSubCategoriesByParentId = async (parentId) => {
  const response = await (await getApi()).get(`/api/prompt-category/sub-category/${parentId}`)
  return response.data
}
