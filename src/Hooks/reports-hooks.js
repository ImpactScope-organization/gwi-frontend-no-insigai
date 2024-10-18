import { useQuery } from '@tanstack/react-query'
import ReportService from '../Services/reports-services'

export const useGetSpecificReportDetails = (id) => {
  return useQuery({
    queryKey: ['getSingleReportDetail'],
    queryFn: () => ReportService.getSpecificReport(id)
  })
}

export const useGetAllInitializedReports = () => {
  return useQuery({
    queryKey: ['useGetAllInitializedReports'],
    queryFn: () => ReportService.getAllInitializedReport()
  })
}

export const useGetAllReportsSentToRegulators = () => {
  return useQuery({
    queryKey: ['getAllReportsSentToRegulators'],
    queryFn: () => ReportService.getAllReportsSentToRegulators()
  })
}
