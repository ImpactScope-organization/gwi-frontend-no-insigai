import { ReportingRiskItem } from '../components/ReportingRiskItem'
import { toTitleCase } from '../../../../../../../utils/helpers'
import React from 'react'
import { useCurrentCompanyReport } from '../../../../hooks/useCurrentCompanyReport'

export const ReportStatus = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()
  return (
    <ReportingRiskItem title="Report status">
      <span
        className={` text-white text-center py-1 px-3   rounded-3xl font-medium ${
          currentCompanyReport?.pending === 'true' && currentCompanyReport?.disregard === 'false'
            ? 'bg-foggyGrey'
            : currentCompanyReport?.reviewing === 'true'
              ? 'bg-review'
              : currentCompanyReport?.reviewed === 'true'
                ? 'bg-darkGreen'
                : currentCompanyReport?.disregard === 'true'
                  ? 'bg-danger'
                  : 'bg-foggyGrey'
        }`}
      >
        {currentCompanyReport?.pending === 'true' && currentCompanyReport?.disregard === 'false'
          ? 'Pending Review'
          : currentCompanyReport?.reviewing === 'true'
            ? 'In Review'
            : currentCompanyReport?.reviewed === 'true'
              ? 'Reviewed'
              : currentCompanyReport?.disregard === 'true'
                ? 'Disregard'
                : toTitleCase(currentCompanyReport?.status) || 'Generated'}
      </span>
    </ReportingRiskItem>
  )
}
