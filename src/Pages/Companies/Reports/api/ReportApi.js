import { getApi } from '../../../../utils/api'

export const updateReport = async (reportId, data) => {
  await (await getApi()).put(`/api/report/update/${reportId}`, data)
}
