import { useQuery } from '@tanstack/react-query'
import { getCompanyInternalReports } from './CompanyApi'

export const useGetCompanyInternalReports = (companyId) => {
  return useQuery({
    queryKey: ['useGetCompanyInternalReports', companyId],
    queryFn: () => getCompanyInternalReports(companyId),
    staleTime: 60000
  })
}
