import { useMemo } from 'react'
import { getUrlWithParameters } from '../../../../../../utils/route'
import { ROUTES } from '../../../../../../routes'
import { useParams } from 'react-router-dom'

export const useSpecificReportURL = () => {
  const { id: reportId } = useParams()

  const specificReportURL = useMemo(
    () => getUrlWithParameters(ROUTES.specificReport.index, { id: reportId }),
    [reportId]
  )

  return {
    specificReportURL
  }
}
