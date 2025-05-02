import { useAccessContext } from '../../../../../../../Context/AccessContext'
import { QuantitativeReportNavigationAdmin } from '../LegacyQuantitativeReportDetails/components/QuantitativeReportNavigationAdmin/QuantitativeReportNavigationAdmin'
import { QuantitativeReportNavigationRegulator } from '../LegacyQuantitativeReportDetails/components/QuantitativeReportNavigationRegulator/QuantitativeReportNavigationRegulator'

export const ReportNavigation = () => {
  const { userRoles } = useAccessContext()

  return (
    <>
      {userRoles.isAdmin && <QuantitativeReportNavigationAdmin />}
      {userRoles.isRegulator && <QuantitativeReportNavigationRegulator />}
    </>
  )
}
