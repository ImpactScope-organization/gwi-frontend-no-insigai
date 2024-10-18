import axios from 'axios'
import apiUrl from '../utils/baseURL'
import { toast } from 'react-toastify'

class ReportService {
  async getAllInitializedReport() {
    const { data } = await axios.get(`${apiUrl}/api/company/all`)
    return data?.results
  }

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
