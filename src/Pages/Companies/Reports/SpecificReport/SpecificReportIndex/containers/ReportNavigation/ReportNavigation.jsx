import { useAccessContext } from '../../../../../../../Context/AccessContext'
import { ReportNavigationAdmin } from './components/QuantitativeReportNavigationAdmin/ReportNavigationAdmin'
import { ReportNavigationRegulator } from './components/ReportNavigationRegulator/ReportNavigationRegulator'

export const ReportNavigation = () => {
  const { userRoles } = useAccessContext()

  return (
    <>
      {userRoles.isAdmin && <ReportNavigationAdmin />}
      {userRoles.isRegulator && <ReportNavigationRegulator />}
    </>
  )
}
