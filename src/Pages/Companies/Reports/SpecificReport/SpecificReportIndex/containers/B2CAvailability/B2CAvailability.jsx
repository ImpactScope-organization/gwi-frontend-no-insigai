import { ReportDetailsCard } from '../../../components/ReportDetailsCard/ReportDetailsCard'
import { ClientItem } from '../ReportVisibility/components/ClientVisibility/components/ClientItem/ClientItem'
import React from 'react'
import { useB2CAvailability } from './useB2CAvailability'

export const B2CAvailability = () => {
  const { b2cAvailabilityItems } = useB2CAvailability()
  // todo refactor ClientItem maybe to be reusable... IF too hard, copy paste...
  return (
    <ReportDetailsCard title="B2C Availability">
      <div className="flex flex-col gap-4 w-full justify-between">
        {b2cAvailabilityItems?.map((client) => (
          <ClientItem key={client.id} client={client} />
        ))}
      </div>
    </ReportDetailsCard>
  )
}
