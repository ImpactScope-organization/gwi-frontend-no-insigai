import { ReportDetailsCard } from '../../../components/ReportDetailsCard/ReportDetailsCard'
import React from 'react'
import { useB2CTierAvailability } from './useB2CTierAvailability'
import { B2CTierItem } from './components/B2CTierItem/B2CTierItem'

export const B2CTierAvailability = () => {
  const { b2cTiers } = useB2CTierAvailability()
  return (
    <ReportDetailsCard title="B2C Availability">
      <div className="flex flex-col gap-4 w-full justify-between">
        {b2cTiers?.map((b2cTier) => (
          <B2CTierItem key={b2cTier.id} b2cTier={b2cTier} />
        ))}
      </div>
    </ReportDetailsCard>
  )
}
