import axios from 'axios'
import apiUrl from '../utils/baseURL'

class ReportService {
  /**
   * getAllReportsSentToRegulators
   * @returns
   */
  async getAllReportsSentToRegulators() {
    const { data } = await axios.get(`${apiUrl}/api/report/getAllReportsSentToRegulators`)
    return data?.results
  }

  /**
   * getSingleReportDetail
   * @returns
   */
  async getSpecificReport(id) {
    const { data } = await axios.get(`${apiUrl}/api/report/getSingleReportDetail/${id}`)
    return data
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ReportService()
