import React from 'react'
import { useCurrentCompanyReport } from '../../../../../hooks/useCurrentCompanyReport'
import { useClientItem } from './useClientItem'
import { ToggleWithLabel } from '../../../../../../../../../Components/ToggleWithLabel/ToggleWithLabel'

export const ClientItem = ({ client }) => {
  const { currentCompanyReportIsLoading } = useCurrentCompanyReport()
  const { handleClientChange } = useClientItem({ client })

  return (
    <>
      <ToggleWithLabel
        label={client.name}
        onChange={handleClientChange}
        checked={client.isSelected}
        disabled={currentCompanyReportIsLoading}
      />
    </>
  )
}
