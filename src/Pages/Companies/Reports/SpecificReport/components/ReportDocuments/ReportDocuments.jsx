import React from 'react'
import { useCurrentCompanyReport } from '../../hooks/useCurrentCompanyReport'

export const ReportDocuments = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()

  return (
    <div className="card_shadow gap-4 rounded-2xl flex basis-4/12 flex-col z-50 p-[16px]">
      <h2 className="text-[18px] leading-[24px] font-[600]">Documents</h2>
      <div className="flex flex-row flex-nowrap justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-2xl">
        <img src="/assets/xls-icon.svg" alt="xls-icon" />
        <h2 className="text-[18px] leading-[24px] mt-1 font-[600]">
          <span className="truncate">{currentCompanyReport?.fileName}</span>
        </h2>
      </div>
    </div>
  )
}
