import React from 'react'
import { formattedDate } from '../../../../../../../utils/date'
import { SpecificReportInputText } from '../../components/SpecificReportInputText/SpecificReportInputText'
import { DynamicTextarea } from '../../components/DynamicTextarea/DynamicTextarea'
import { useCurrentCompanyReport } from '../../../hooks/useCurrentCompanyReport'
import { ReportContentItem } from '../../../components/ReportContentItem'
import { Sources } from '../../../containers/Sources'
import { ReportDetailsCard } from '../../../components/ReportDetailsCard/ReportDetailsCard'

export const EditQualitativeReportDetails = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()

  return (
    <ReportDetailsCard>
      <div>
        <h3 className="leading-[24px] text-sm text-reportGrey font-medium">{formattedDate}</h3>
        <h1 className="leading-[64px] text-darkBlack text-2xl font-bold">
          {currentCompanyReport?.companyName}
        </h1>

        <div className="flex flex-col gap-[16px] mt-[24px]">
          <SpecificReportInputText name="title" label="Title" />
          <SpecificReportInputText name="jurisdiction" label="Jurisdiction" />
          <SpecificReportInputText name="sector" label="Sector" />
          <SpecificReportInputText name="annualRevenue" label="Annual Revenue" />
          <SpecificReportInputText name="noOfEmployees" label="Employees" />
        </div>
      </div>

      <div className="flex flex-col gap-[16px] mt-[24px]">
        <DynamicTextarea label="Contradictions" name="contradiction" />
        <DynamicTextarea label="Unsubstantiated claims" name="unsubstantiatedClaims" />
      </div>

      <ReportContentItem
        title="Potential inconsistencies"
        displayValue={currentCompanyReport?.potentialInconsistencies}
      />
      <Sources />
    </ReportDetailsCard>
  )
}
