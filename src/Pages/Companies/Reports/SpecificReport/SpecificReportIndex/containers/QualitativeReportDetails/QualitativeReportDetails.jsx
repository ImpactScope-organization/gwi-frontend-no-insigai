import React from 'react'
import { formattedDate } from '../../../../../../../utils/date'
import { ReportMetaItem } from './components/ReportMetaItem'
import { ReportContentItem } from '../../../components/ReportContentItem'
import { Sources } from '../../../containers/Sources'
import { useCurrentCompanyReport } from '../../../hooks/useCurrentCompanyReport'
import { ReportDetailsCard } from '../../../components/ReportDetailsCard/ReportDetailsCard'

export const QualitativeReportDetails = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()

  return (
    <ReportDetailsCard>
      <div>
        <p className="leading-[24px] text-sm text-reportGrey font-medium">{formattedDate}</p>
        <h1 className="leading-[64px] text-darkBlack text-2xl font-bold">
          {currentCompanyReport?.companyName}
        </h1>

        <div className="mt-[16px]">
          <ReportMetaItem title="Jurisdiction" content={currentCompanyReport?.jurisdiction} />
          <ReportMetaItem title="Sector" content={currentCompanyReport?.sector} />
          <ReportMetaItem title="Annual Revenue" content={currentCompanyReport?.annualRevenue} />
          <ReportMetaItem
            title="Employees"
            content={currentCompanyReport?.noOfEmployees?.toLocaleString()}
          />
        </div>
      </div>
      <ReportContentItem
        title="Contradictions"
        displayValue={currentCompanyReport?.contradiction}
      />
      <ReportContentItem
        title="Unsubstantiated claims"
        displayValue={currentCompanyReport?.unsubstantiatedClaims}
      />
      <ReportContentItem
        title="Potential inconsistencies"
        displayValue={currentCompanyReport?.potentialInconsistencies}
      />
      <Sources />
    </ReportDetailsCard>
  )
}
