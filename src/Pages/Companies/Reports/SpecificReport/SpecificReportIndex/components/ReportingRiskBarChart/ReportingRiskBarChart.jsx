import React, { useMemo } from 'react'
import { ReportingRiskItem } from '../../containers/LegacyQuantitativeReportDetails/components/ReportingRiskItem'

export const ReportingRiskBarChart = ({ percentage, title }) => {
  const percentageItems = useMemo(() => Array.from({ length: 10 }), [])

  return (
    <ReportingRiskItem title={title}>
      <div className="flex gap-2">
        <div className="flex flex-row items-center gap-[4px] flex-nowrap">
          {percentageItems.map((_item, index) => {
            return (
              <div
                key={`${index}-bar`}
                className={`w-[4px] h-[14px] rounded-sm ${
                  (index + 1) * 10 <= parseInt(percentage) ? 'bg-darkGreen' : 'bg-reportGrey '
                }`}
              />
            )
          })}
        </div>
        <div className="text-darkBlack text-[1em] text-base font-medium w-8 text-right">
          {parseInt(percentage)}%
        </div>
      </div>
    </ReportingRiskItem>
  )
}
