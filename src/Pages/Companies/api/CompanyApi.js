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

export const getCompany = async (companyId) => {
  const response = await axios.get(`${apiUrl}/api/company/${companyId}`)
  return response.data
}

export const getCompanyInternalReports = async (companyId) => {
  const response = await axios.get(`${apiUrl}/api/company/${companyId}/reports/internal`)
  return response.data
}

export const getCompanyRegulatorReports = async (companyId) => {
  const response = await axios.get(`${apiUrl}/api/company/${companyId}/reports/regulator`)
  return response.data
}
