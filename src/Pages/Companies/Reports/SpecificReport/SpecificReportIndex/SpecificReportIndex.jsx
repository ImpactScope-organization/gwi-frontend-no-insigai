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
import { ReportNavigation } from './containers/ReportNavigation/ReportNavigation'
import { ReportInfo } from './containers/ReportInfo/ReportInfo'
import { QuantitativeReportDetails } from './containers/QuantitativeReportDetails/QuantitativeReportDetails'

export const SpecificReportIndex = () => {
  const { companyId } = useParams()
  const { currentCompanyReportIsLoading, currentCompanyReport } = useCurrentCompanyReport()
  const { getCompanyRouteByRole } = useAccessContext()

  const isReportDetailsLegacy =
    !currentCompanyReport?.quantitativePercentages ||
    currentCompanyReport?.quantitativePercentages?.length === 0

  if (currentCompanyReportIsLoading) {
    return <LoadingPage title="Please wait..." />
  }
  return (
    <PageContainer>
      <div className="flex justify-between items-center gap-8 mb-8">
        <div className="w-1/3 lg:w-2/3">
          <BackButtonLink
            to={getCompanyRouteByRole({
              companyId
            })}
          />
        </div>
        <div className="w-2/3 lg:w-1/3">
          <ReportNavigation />
        </div>
      </div>

      <div id="report-container" className="flex flex-col lg:flex-row gap-8 mx-auto">
        <div className="w-full lg:w-2/3">
          <QualitativeReportDetails />
        </div>

        <div className="w-full lg:w-1/3">
          <div className="flex flex-col gap-8">
            {isReportDetailsLegacy ? (
              <LegacyQuantitativeReportDetails />
            ) : (
              <QuantitativeReportDetails />
            )}
            <ReportInfo />
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
