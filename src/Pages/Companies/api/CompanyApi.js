import axios from 'axios'
import apiUrl from '../../../utils/baseURL'

export const createCompany = async (company) => {
  const response = await axios.post(`${apiUrl}/api/company/create`, company)
  return response.data
}

export const fetchCompanyList = async () => {
  const response = await axios.get(`${apiUrl}/api/company`)
  return response.data
}

export const getCompanyInternalReports = async (id) => {
  const response = await axios.get(`${apiUrl}/api/company/${id}/reports/internal`)
  return response.data
}
