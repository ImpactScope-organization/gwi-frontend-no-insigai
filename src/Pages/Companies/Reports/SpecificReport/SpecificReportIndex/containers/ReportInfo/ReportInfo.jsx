import { ReportingRiskItem } from '../LegacyQuantitativeReportDetails/components/ReportingRiskItem'
import { ReportStatus } from '../LegacyQuantitativeReportDetails/containers/ReportStatus'
import { BlockchainDetails } from '../LegacyQuantitativeReportDetails/components/BlockchainDetails'
import React from 'react'
import { useCurrentCompanyReport } from '../../../hooks/useCurrentCompanyReport'
import { ReportDetailsCard } from '../../../components/ReportDetailsCard/ReportDetailsCard'

export const ReportInfo = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()

  return (
    <ReportDetailsCard title="Report info">
      <div className="flex flex-col gap-4">
        <ReportingRiskItem title="GHG emissions">
          {currentCompanyReport?.GHGEmissions}
        </ReportingRiskItem>
        <ReportStatus />
        <BlockchainDetails />
      </div>
    </ReportDetailsCard>
  )
}
