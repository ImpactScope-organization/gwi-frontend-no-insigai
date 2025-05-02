import React from 'react'
import { useCurrentCompanyReport } from '../../hooks/useCurrentCompanyReport'
import { ReportDetailsCard } from '../ReportDetailsCard/ReportDetailsCard'

export const ReportDocuments = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()

  return (
    <ReportDetailsCard title="Documents">
      <div className="flex flex-row flex-nowrap justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-2xl">
        <img src="/assets/xls-icon.svg" alt="xls-icon" />
        <h2 className="text-[18px] leading-[24px] mt-1 font-[600]">
          <span className="truncate">{currentCompanyReport?.fileName}</span>
        </h2>
      </div>
    </ReportDetailsCard>
  )
}
