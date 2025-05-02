import { ReportDetailsCard } from '../../../../components/ReportDetailsCard/ReportDetailsCard'
import { GaugeChart } from '../../../../../../../../Components/gauge-chart/GaugeChart'
import React from 'react'

export const QuantitativeReportDetailListItem = ({ quantitativePercentage }) => {
  return (
    <ReportDetailsCard title={quantitativePercentage.name}>
      <div className="overflow-hidden w-full px-2 flex justify-center items-center ">
        <GaugeChart
          percentage={quantitativePercentage.value.toFixed(0)}
          title={quantitativePercentage.name}
        />
      </div>
    </ReportDetailsCard>
  )
}
