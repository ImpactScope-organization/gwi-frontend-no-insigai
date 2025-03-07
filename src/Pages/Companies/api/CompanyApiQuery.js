import { useQuery } from '@tanstack/react-query'
import { fetchCompanyList, getCompany, getCompanyInternalReports } from './CompanyApi'

export const useGetCompanyInternalReports = (companyId) => {
  return useQuery({
    queryKey: ['useGetCompanyInternalReports', companyId],
    queryFn: () => getCompanyInternalReports(companyId),
    staleTime: 60000
  })
}

export const useFetchCompanyList = () => {
  return useQuery({
    queryKey: ['fetchCompanyList'],
    queryFn: () => fetchCompanyList()
  })
}

export const useGetCompany = (companyId) => {
  return useQuery({
    queryKey: ['getCompany', companyId],
    queryFn: () => getCompany(companyId),
    staleTime: 60000
  })
}
