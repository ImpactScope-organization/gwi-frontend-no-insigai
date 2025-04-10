import axios from 'axios'
import apiUrl from '../../../../utils/baseURL'

export const updateReport = async (reportId, data) => {
  await axios.put(`${apiUrl}/api/report/update/${reportId}`, data)
}
