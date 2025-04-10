import React from 'react'
import { ClientItem } from './components/ClientItem/ClientItem'
import { useFetchClientList } from '../../../../../../../../Clients/api/ClientApi/ClientApiQuery'
import { useCurrentCompanyReport } from '../../../../../hooks/useCurrentCompanyReport'

export const ClientVisibility = () => {
  const { data: clients } = useFetchClientList()
  const { currentCompanyReport } = useCurrentCompanyReport()

  const clientToggleList = clients?.map((client) => {
    return {
      ...client,
      isSelected: currentCompanyReport?.clientIds?.includes(client.id) || false
    }
  })

  return (
    <div className="flex-col">
      <h2 className="text-[18px] leading-[24px] font-[600]">Specific clients</h2>
      <div className="flex flex-row gap-2 w-full justify-between">
        {clientToggleList?.map((client) => (
          <ClientItem key={client.id} client={client} />
        ))}
      </div>
    </div>
  )
}
