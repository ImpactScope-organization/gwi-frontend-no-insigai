import React from 'react'
import Switch from 'react-switch'
import { useCurrentCompanyReport } from '../../../../hooks/useCurrentCompanyReport'
import { useB2CAvailabilityItem } from './useB2CAvailabilityItem'
import { ToggleWithLabel } from '../../../../../../../../Components/ToggleWithLabel/ToggleWithLabel'

export const B2CAvailabilityItem = ({ b2cAvailabilityItem }) => {
  const { currentCompanyReportIsLoading } = useCurrentCompanyReport()
  const { handleB2CAvailabilityChange } = useB2CAvailabilityItem({ b2cAvailabilityItem })

  return (
    <ToggleWithLabel
      label={b2cAvailabilityItem.name}
      checked={b2cAvailabilityItem.isSelected}
      onChange={handleB2CAvailabilityChange}
      disabled={currentCompanyReportIsLoading}
    />
  )
}
