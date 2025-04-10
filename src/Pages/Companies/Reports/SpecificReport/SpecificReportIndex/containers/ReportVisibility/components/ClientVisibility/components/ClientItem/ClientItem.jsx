import React from 'react'
import Switch from 'react-switch'
import { useCurrentCompanyReport } from '../../../../../../../hooks/useCurrentCompanyReport'
import { useClientItem } from './useClientItem'

export const ClientItem = ({ client }) => {
  const { currentCompanyReportIsLoading } = useCurrentCompanyReport()
  const { handleClientChange } = useClientItem({ client })

  return (
    <div className="flex flex-row gap-2 w-full justify-between">
      <h2 className="text-[16px] leading-[24px] font-[500] block">{client.name}</h2>
      <div>
        <Switch
          height={24}
          onChange={handleClientChange}
          checked={client.isSelected}
          checkedIcon={false}
          disabled={currentCompanyReportIsLoading}
          uncheckedIcon={false}
          onColor="#4DC601"
        />
      </div>
    </div>
  )
}
