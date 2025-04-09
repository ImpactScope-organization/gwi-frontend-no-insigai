import React from 'react'
import Switch from 'react-switch'
import { useCurrentCompanyReport } from '../../../../../../hooks/useCurrentCompanyReport'
import axios from 'axios'
import apiUrl from '../../../../../../../../../../utils/baseURL'

export const ClientItem = ({ client }) => {
  const { getCurrentCompanyReport, currentCompanyReport, currentCompanyReportIsLoading, reportId } =
    useCurrentCompanyReport()

  return (
    <div className="flex flex-row gap-2 w-full justify-between">
      <h2 className="text-[16px] leading-[24px] mt-1 font-[500]">
        <span className="truncate">{client.name}</span>
      </h2>
      <div>
        <Switch
          height={24}
          onChange={async (selected) => {
            const clientIds = [...currentCompanyReport.clientIds]
            if (selected) {
              clientIds.push(client.id)
            } else {
              clientIds.splice(client.id, 1)
            }

            await axios.put(`${apiUrl}/api/report/update/${reportId}`, {
              clientIds
            })
            await getCurrentCompanyReport()
          }}
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
