import { ReportDetailsCard } from '../../../../components/ReportDetailsCard/ReportDetailsCard'
import { GaugeChart } from '../../../components/GaugeChart/GaugeChart'
import React from 'react'
import { ReportingRiskBarChart } from '../../../components/ReportingRiskBarChart/ReportingRiskBarChart'
import { Divider } from 'antd'

export const QuantitativeReportDetailListItem = ({ quantitativePercentage }) => {
  return (
    <ReportDetailsCard title={quantitativePercentage.name}>
      <div className="flex flex-col gap-6">
        <div className="w-full px-2 flex justify-center items-center">
          <GaugeChart percentage={quantitativePercentage.value.toFixed(0)} />
        </div>

        <Divider className="m-0" />
        <h3 className="font-bold">Details</h3>
        <div className="flex flex-col gap-2">
          {quantitativePercentage.components.map((quantitativePercentageComponent) => (
            <ReportingRiskBarChart
              key={quantitativePercentageComponent.id}
              title={quantitativePercentageComponent.name}
              percentage={quantitativePercentageComponent.value}
            />
          ))}
        </div>
      </div>
    </ReportDetailsCard>
  )
}
