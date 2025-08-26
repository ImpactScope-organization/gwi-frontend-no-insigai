import React from 'react'
import Switch from 'react-switch'
import { useCurrentCompanyReport } from '../../../../hooks/useCurrentCompanyReport'
import { useB2CAvailabilityItem } from './useB2CAvailabilityItem'

export const B2CAvailabilityItem = ({ b2cAvailabilityItem }) => {
  const { currentCompanyReportIsLoading } = useCurrentCompanyReport()
  const { handleB2CAvailabilityChange } = useB2CAvailabilityItem({ b2cAvailabilityItem })

  return (
    <div className="flex flex-row w-full justify-between">
      <h2 className="text-[16px] leading-[24px] font-[500]">{b2cAvailabilityItem.name}</h2>
      <Switch
        height={24}
        onChange={handleB2CAvailabilityChange}
        checked={b2cAvailabilityItem.isSelected}
        checkedIcon={false}
        disabled={currentCompanyReportIsLoading}
        uncheckedIcon={false}
        onColor="#4DC601"
      />
    </div>
  )
}
