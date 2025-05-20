import { SpecificReportInputPercentage } from '../../components/SpecificReportInputText/SpecificReportInputPercentage'
import { SpecificReportInputText } from '../../components/SpecificReportInputText/SpecificReportInputText'

export const EditQuantitativeReportDetails = () => {
  return (
    <div className="card_shadow rounded-2xl flex basis-4/12 flex-col gap-1 py-4 px-3">
      <h5 className="text-[18px] leading-[24px] font-[600]">Report</h5>
      <div className="flex flex-col gap-[16px] my-[24px]">
        <SpecificReportInputPercentage name="greenwashRiskPercentage" label="Greenwashing risk" />
        <SpecificReportInputPercentage name="reportingRiskPercentage" label="Reporting risk" />

        <SpecificReportInputText name="GHGEmissions" label="GHG emissions" />
      </div>
    </div>
  )
}
