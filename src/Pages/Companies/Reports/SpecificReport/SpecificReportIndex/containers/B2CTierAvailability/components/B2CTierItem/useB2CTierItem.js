import { useCallback } from 'react'
import { useCurrentCompanyReport } from '../../../../../hooks/useCurrentCompanyReport'
import { useGetCompanyRegulatorReports } from '../../../../../../../api/CompanyApiQuery'
import { updateReport } from '../../../../../../api/ReportApi'

export const useB2CTierItem = ({ b2cTier }) => {
  const { getCurrentCompanyReport, currentCompanyReport, reportId } = useCurrentCompanyReport()
  const { refetchRegulatorReports } = useGetCompanyRegulatorReports()

  const getFilteredB2CTiers = useCallback(
    (selected) => {
      if (selected) {
        return [...currentCompanyReport.b2cTiers, b2cTier.id]
      } else {
        return currentCompanyReport.b2cTiers.filter((id) => id !== b2cTier.id)
      }
    },
    [b2cTier.id, currentCompanyReport.b2cTiers]
  )

  const handleB2CTierChange = async (selected) => {
    const b2cTiers = getFilteredB2CTiers(selected)

    await updateReport(reportId, {
      b2cTiers
    })
    await getCurrentCompanyReport()
    await refetchRegulatorReports()
  }

  return {
    handleB2CTierChange
  }
}
