import { useQuery } from '@tanstack/react-query'
import ReportService from '../Services/reports-services'

const useGetSpecificReportDetails = (id) => {
  return useQuery({
    queryKey: ['getSingleReportDetail'],
    queryFn: () => ReportService.getSpecificReport(id)
  })
}

const useGetAllReportsSentToRegulators = () => {
  return useQuery({
    queryKey: ['getAllReportsSentToRegulators'],
    queryFn: () => ReportService.getAllReportsSentToRegulators()
  })
}

export { useGetSpecificReportDetails, useGetAllReportsSentToRegulators }
