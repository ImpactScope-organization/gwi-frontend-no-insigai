import { useSpecificReportEdit } from '../../useSpecificReportEdit'
import { SpecificReportInputPercentage } from '../../components/SpecificReportInputText/SpecificReportInputPercentage'
import { SpecificReportInputText } from '../../components/SpecificReportInputText/SpecificReportInputText'
import { useNavigate } from 'react-router-dom'
import { ReportDocuments } from '../../../components/ReportDocuments/ReportDocuments'

export const EditQuantitativeReportDetails = () => {
  const navigate = useNavigate()

  const {
    isModifying,
    modifyData,
    setModifyData,
    handleInputUpdates,
    submitUpdateReport,
    specificReportURL
  } = useSpecificReportEdit()

  return (
    <div className="card_shadow rounded-2xl flex basis-4/12 flex-col gap-1 py-4 px-3">
      <h5 className="text-[18px] leading-[24px] font-[600]">Report</h5>
      <div className="flex flex-col gap-[16px] my-[24px]">
        <SpecificReportInputPercentage name="greenwashRiskPercentage" label="Greenwashing risk" />
        <SpecificReportInputPercentage name="reportingRiskPercentage" label="Reporting risk" />

        <SpecificReportInputText name="GHGEmissions" label="GHG emissions" />
      </div>
      <div className="flex items-center gap-4 ">
        <button
          onClick={submitUpdateReport}
          className="bg-primary rounded-lg py-[12px] flex w-full justify-center text-[#fff] text-[16px] font-[600] leading-[24px]"
        >
          Update report
        </button>
        <button
          className="bg-transparent border border-darkBlack rounded-lg py-[12px] px-[4px] flex w-full justify-center text-darkBlack text-[16px] font-[600] leading-[24px]"
          onClick={() => {
            navigate(specificReportURL)
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
