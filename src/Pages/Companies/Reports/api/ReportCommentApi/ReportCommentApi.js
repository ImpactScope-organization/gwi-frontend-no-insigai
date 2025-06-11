import { getApi } from '../../../../../utils/api'

export const getReportComments = async (reportId) => {
  return await (await getApi()).get(`/api/report/${reportId}/comments`)
}
export const createReportComment = async (reportId, data) => {
  await (await getApi()).post(`/api/report/${reportId}/comments/create`, data)
}
