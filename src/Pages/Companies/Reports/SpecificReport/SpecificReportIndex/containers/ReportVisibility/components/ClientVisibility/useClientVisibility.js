import { useFetchClientList } from '../../../../../../../../Clients/api/ClientApi/ClientApiQuery'
import { useCurrentCompanyReport } from '../../../../../hooks/useCurrentCompanyReport'

export const useClientVisibility = () => {
  const { data: clients } = useFetchClientList()
  const { currentCompanyReport } = useCurrentCompanyReport()

  const clientToggleList = clients?.map((client) => {
    return {
      ...client,
      isSelected: currentCompanyReport?.clientIds?.includes(client.id) || false
    }
  })

  return {
    clientToggleList
  }
}
