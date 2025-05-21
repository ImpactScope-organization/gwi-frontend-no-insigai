import { useCurrentCompanyReport } from '../../../hooks/useCurrentCompanyReport'
import { QuantitativeReportDetailListItem } from './components/QuantitativeReportDetailListItem'

export const QuantitativeReportDetails = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()

  return (
    <>
      {currentCompanyReport?.quantitativePercentages?.map((quantitativeReportPercentageItem) => (
        <QuantitativeReportDetailListItem
          key={quantitativeReportPercentageItem.id}
          quantitativePercentage={quantitativeReportPercentageItem}
        />
      ))}
    </>
  )
}
