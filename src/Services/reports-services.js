import { getApi } from '../utils/api'

class ReportService {
  async getCompanyReport(reportId) {
    const { data } = await (await getApi()).get(`/api/report/${reportId}`)
    return data?.result
  }
  async getReportByReportQueueId(reportQueueId) {
    const { data } = await (
      await getApi()
    ).get(`/api/report/getReportByReportQueueId/${reportQueueId}`)
    return data?.result
  }

  async getAllInitializedReport() {
    const { data } = await (await getApi()).get(`/api/report/all`)
    return data?.results
  }

  /**
   * getAllReportsSentToRegulators
   * @returns
   */
  async getAllReportsSentToRegulators() {
    const { data } = await (await getApi()).get(`/api/report/getAllReportsSentToRegulators`)
    return data?.results
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ReportService()
