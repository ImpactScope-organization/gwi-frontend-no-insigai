import React from 'react'
import { ClientItem } from './components/ClientItem/ClientItem'
import { useClientVisibility } from './useClientVisibility'
import { ReportDetailsCard } from '../../../../components/ReportDetailsCard/ReportDetailsCard'

export const ClientVisibility = () => {
  const { clientToggleList } = useClientVisibility()

  return (
    <ReportDetailsCard title="Specific clients">
      <div className="flex flex-col gap-4 w-full justify-between">
        {clientToggleList?.map((client) => (
          <ClientItem key={client.id} client={client} />
        ))}
      </div>
    </ReportDetailsCard>
  )
}
