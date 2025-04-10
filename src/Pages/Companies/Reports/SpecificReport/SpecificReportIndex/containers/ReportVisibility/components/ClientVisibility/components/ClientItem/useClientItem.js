import { useCurrentCompanyReport } from '../../../../../../../hooks/useCurrentCompanyReport'
import axios from 'axios'
import apiUrl from '../../../../../../../../../../../utils/baseURL'

export const useClientItem = ({ client }) => {
  const { getCurrentCompanyReport, currentCompanyReport, reportId } = useCurrentCompanyReport()

  const handleClientChange = async (selected) => {
    const clientIds = [...currentCompanyReport.clientIds]
    if (selected) {
      clientIds.push(client.id)
    } else {
      clientIds.splice(client.id, 1)
    }

    await axios.put(`${apiUrl}/api/report/update/${reportId}`, {
      clientIds
    })
    await getCurrentCompanyReport()
  }

  return {
    handleClientChange
  }
}
