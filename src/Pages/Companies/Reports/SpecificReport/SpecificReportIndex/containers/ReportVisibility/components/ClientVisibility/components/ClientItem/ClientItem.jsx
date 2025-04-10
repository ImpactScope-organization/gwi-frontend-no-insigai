import React from 'react'
import Switch from 'react-switch'
import { useCurrentCompanyReport } from '../../../../../../../hooks/useCurrentCompanyReport'
import axios from 'axios'
import apiUrl from '../../../../../../../../../../../utils/baseURL'
import { useClientItem } from './useClientItem'

export const ClientItem = ({ client }) => {
  const { currentCompanyReportIsLoading } = useCurrentCompanyReport()
  const { handleClientChange } = useClientItem({ client })

  return (
    <div className="flex flex-row gap-2 w-full justify-between">
      <h2 className="text-[16px] leading-[24px] mt-1 font-[500]">
        <span className="truncate">{client.name}</span>
      </h2>
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
