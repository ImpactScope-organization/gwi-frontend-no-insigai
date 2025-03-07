import { useMemo } from 'react'
import { getRouteWithParams, ROUTES } from '../../../../../../routes'
import { useParams } from 'react-router-dom'

export const useSpecificReportURL = () => {
  const { reportId, companyId } = useParams()

  const specificReportURL = useMemo(
    () =>
      getRouteWithParams(ROUTES.companies.reports.report.index, {
        companyId,
        reportId
      }),
    [companyId, reportId]
  )

  return {
    specificReportURL
  }
}
