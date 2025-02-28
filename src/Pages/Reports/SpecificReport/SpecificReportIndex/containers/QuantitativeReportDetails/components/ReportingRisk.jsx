import React from 'react'
import { ReportingRiskItem } from './ReportingRiskItem'

export const ReportingRisk = ({ reportingRiskPercentage }) => (
  <ReportingRiskItem title="Reporting risk">
    <div className="flex flex-row  items-center gap-[4px] flex-nowrap">
      {Array.from({ length: 10 }).map((_item, index) => {
        return (
          <div
            key={`${index}-bar`}
            className={`w-[4px] h-[14px] rounded-sm ${
              (index + 1) * 10 <= parseInt(reportingRiskPercentage)
                ? 'bg-darkGreen'
                : 'bg-reportGrey '
            }`}
          ></div>
        )
      })}
      <p className="text-darkBlack ml-[8px] text-[1em] text-base font-medium">
        {parseInt(reportingRiskPercentage)}%
      </p>
    </div>
  </ReportingRiskItem>
)
