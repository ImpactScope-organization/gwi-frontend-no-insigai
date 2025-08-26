import { useCallback } from 'react'
import { useCurrentCompanyReport } from '../../../../../hooks/useCurrentCompanyReport'
import { updateReport } from '../../../../../../api/ReportApi'
import { useGetCompanyRegulatorReports } from '../../../../../../../api/CompanyApiQuery'

export const useClientItem = ({ client }) => {
  const { getCurrentCompanyReport, currentCompanyReport, reportId } = useCurrentCompanyReport()
  const { refetchRegulatorReports } = useGetCompanyRegulatorReports()

  const getFilteredClientIds = useCallback(
    (selected) => {
      if (selected) {
        return [...currentCompanyReport.clientIds, client.id]
      } else {
        return currentCompanyReport.clientIds.filter((id) => id !== client.id)
      }
    },
    [client.id, currentCompanyReport.clientIds]
  )

  const handleClientChange = async (selected) => {
    const clientIds = getFilteredClientIds(selected)

    await updateReport(reportId, {
      clientIds
    })
    await getCurrentCompanyReport()
    await refetchRegulatorReports()
  }

  return {
    handleClientChange
  }
}
