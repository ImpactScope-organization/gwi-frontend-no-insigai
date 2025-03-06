import React from 'react'
import { formattedDate } from '../../../../../../utils/date'
import { SpecificReportInputText } from '../../components/SpecificReportInputText/SpecificReportInputText'
import { DynamicTextarea } from '../../components/DynamicTextarea/DynamicTextarea'
import { useCurrentCompanyReport } from '../../../hooks/useCurrentCompanyReport'
import { ReportContentItem } from '../../../SpecificReportIndex/containers/QualitativeReportDetails/components/ReportContentItem'
import { Sources } from '../../../SpecificReportIndex/containers/QualitativeReportDetails/containers/Sources'

export const EditQualitativeReportDetails = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()

  return (
    <div
      style={{
        boxShadow: '0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)'
      }}
      className="basis-8/12 max-w-[740px] p-[16px]  mx-auto rounded-2xl "
    >
      <div>
        <h3 className="leading-[24px] text-sm text-reportGrey font-medium">{formattedDate}</h3>
        <h1 className="leading-[64px] text-darkBlack text-2xl font-bold">
          {currentCompanyReport?.companyName}
        </h1>

        <div className="flex flex-col gap-[16px] mt-[24px]">
          <SpecificReportInputText name="jurisdiction" label="Jurisdiction" />
          <SpecificReportInputText name="sector" label="Sector" />
          <SpecificReportInputText name="annualRevenue" label="Annual Revenue" />
          <SpecificReportInputText name="noOfEmployees" label="Employees" />
        </div>
      </div>

      <DynamicTextarea label="Contradictions" name="contradiction" />
      <DynamicTextarea label="Unsubstantiated claims" name="unsubstantiatedClaims" />

      <ReportContentItem
        title="Potential inconsistencies"
        displayValue={currentCompanyReport?.potentialInconsistencies}
      />
      <Sources />
    </div>
  )
}
