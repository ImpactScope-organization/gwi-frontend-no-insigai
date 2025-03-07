import { useParams } from 'react-router-dom'
import { useGetCompanyReport } from '../../../../../Hooks/reports-hooks'

export const useCurrentCompanyReport = () => {
  const { reportId } = useParams()

  const {
    refetch: getCurrentCompanyReport,
    data: currentCompanyReport,
    isLoading: currentCompanyReportIsLoading
  } = useGetCompanyReport(reportId)

  return {
    getCurrentCompanyReport,
    currentCompanyReport,
    currentCompanyReportIsLoading,
    reportId
  }
}
