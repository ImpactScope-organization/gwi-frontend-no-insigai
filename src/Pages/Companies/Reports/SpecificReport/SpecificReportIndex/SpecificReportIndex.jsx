import React from 'react'
import LoadingPage from '../../../../../Components/loading'
import { BackButtonLink } from '../../../../../Components/BackButtonLink/BackButtonLink'
import { PageContainer } from '../../../../../Components/Page/PageContainer/PageContainer'
import { QualitativeReportDetails } from './containers/QualitativeReportDetails/QualitativeReportDetails'
import { LegacyQuantitativeReportDetails } from './containers/LegacyQuantitativeReportDetails/LegacyQuantitativeReportDetails'
import { useCurrentCompanyReport } from '../hooks/useCurrentCompanyReport'
import { ReportDocuments } from '../components/ReportDocuments/ReportDocuments'
import { ReportVisibility } from './containers/ReportVisibility/ReportVisibility'
import { useParams } from 'react-router-dom'
import { RoleRender } from '../../../../../Components/Restrict/RoleRender/RoleRender'
import { ROLES } from '../../../../../utils/roles'
import { useAccessContext } from '../../../../../Context/AccessContext'

export const SpecificReportIndex = () => {
  const { companyId } = useParams()
  const { currentCompanyReportIsLoading, currentCompanyReport } = useCurrentCompanyReport()
  const { getCompanyRouteByRole } = useAccessContext()

  if (currentCompanyReportIsLoading) {
    return <LoadingPage title="Please wait..." />
  }
  return (
    <PageContainer>
      <BackButtonLink
        to={getCompanyRouteByRole({
          companyId
        })}
      />

      <div id="report-container" className="flex flex-col md:flex-row gap-6 max-w-[1120px] mx-auto">
        <QualitativeReportDetails />

        <div>
          <div className="flex flex-col gap-8">
            {(!currentCompanyReport?.quantitativePercentages ||
              currentCompanyReport?.quantitativePercentages?.length === 0) && (
              <LegacyQuantitativeReportDetails />
            )}
            <ReportDocuments />
            <RoleRender role={ROLES.ADMIN}>
              <ReportVisibility />
            </RoleRender>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
