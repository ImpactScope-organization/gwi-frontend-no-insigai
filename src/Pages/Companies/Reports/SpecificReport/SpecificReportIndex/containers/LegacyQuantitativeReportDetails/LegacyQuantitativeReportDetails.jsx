import CustomGaugeChart from '../../../../../../../Components/gauge-chart'
import React from 'react'
import { useQuantitativeReportDetails } from './useQuantitativeReportDetails'
import { ReportingRisk } from './components/ReportingRisk'
import { ReportDetailsCard } from '../../../components/ReportDetailsCard/ReportDetailsCard'

export const LegacyQuantitativeReportDetails = () => {
  const { greenwashingRiskPercentage, reportingRiskPercentage } = useQuantitativeReportDetails()

  return (
    <ReportDetailsCard title="Report">
      <div className="overflow-hidden w-full px-2 flex justify-center items-center ">
        <CustomGaugeChart percentage={greenwashingRiskPercentage} />
      </div>
      {/* Cols */}
      <div className="mt-[24px] flex flex-col lg:max-w-[370px]  gap-2 my-3 ">
        <ReportingRisk reportingRiskPercentage={reportingRiskPercentage} />
      </div>
    </ReportDetailsCard>
  )
}
