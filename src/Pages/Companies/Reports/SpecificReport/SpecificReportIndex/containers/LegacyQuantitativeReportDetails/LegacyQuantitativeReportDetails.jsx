import { GaugeChart } from '../../components/GaugeChart/GaugeChart'
import React from 'react'
import { useQuantitativeReportDetails } from './useQuantitativeReportDetails'
import { ReportDetailsCard } from '../../../components/ReportDetailsCard/ReportDetailsCard'
import { ReportingRiskBarChart } from '../../components/ReportingRiskBarChart/ReportingRiskBarChart'

export const LegacyQuantitativeReportDetails = () => {
  const { greenwashingRiskPercentage, reportingRiskPercentage } = useQuantitativeReportDetails()

  return (
    <ReportDetailsCard title="Report">
      <div className="overflow-hidden w-full px-2 flex justify-center items-center ">
        <GaugeChart percentage={greenwashingRiskPercentage} title="Greenwashing risk" />
      </div>
      <div className="mt-[24px] flex flex-col lg:max-w-[370px]  gap-2 my-3 ">
        <ReportingRiskBarChart title="Reporting risk" percentage={reportingRiskPercentage} />
      </div>
    </ReportDetailsCard>
  )
}
