import { useFetchClientList } from '../../../../../../../../Clients/api/ClientApi/ClientApiQuery'
import { useCurrentCompanyReport } from '../../../../../hooks/useCurrentCompanyReport'
import { useMemo } from 'react'

export const useClientVisibility = () => {
  const { data: clients } = useFetchClientList()
  const { currentCompanyReport } = useCurrentCompanyReport()

  const clientToggleList = useMemo(
    () =>
      clients?.map((client) => {
        return {
          ...client,
          isSelected: currentCompanyReport?.clientIds?.includes(client.id) || false
        }
      }),
    [clients, currentCompanyReport?.clientIds]
  )

  return {
    clientToggleList
  }
}
