import { useCallback } from 'react'
import { useCurrentCompanyReport } from '../../../../../../../hooks/useCurrentCompanyReport'
import axios from 'axios'
import apiUrl from '../../../../../../../../../../../utils/baseURL'
import { updateReport } from '../../../../../../../../api/ReportApi'

export const useClientItem = ({ client }) => {
  const { getCurrentCompanyReport, currentCompanyReport, reportId } = useCurrentCompanyReport()

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
  }

  return {
    handleClientChange
  }
}
