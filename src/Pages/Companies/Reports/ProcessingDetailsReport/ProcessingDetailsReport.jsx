import React from 'react'
import { useParams } from 'react-router-dom'
import { PageContainer } from '../../../../Components/Page/PageContainer/PageContainer'
import { useProcessingDetailsReport } from './useProcessingDetailsReport'
import { Progress } from 'antd'
import { PageHeader } from '../../../../Components/Page/PageHeader/PageHeader'
import { BackButtonLink } from '../../../../Components/BackButtonLink/BackButtonLink'
import { getRouteWithParams, ROUTES } from '../../../../routes'
import { ButtonLink } from '../../../../Components/ButtonLink/ButtonLink'

export const ProcessingDetailsReport = () => {
  const { companyId } = useParams()
  const { percentage, report, isReportCreated, processingStatus } = useProcessingDetailsReport()

  return (
    <PageContainer>
      <div className="mb-8">
        <BackButtonLink
          to={getRouteWithParams(ROUTES.companies.reports.processing, {
            companyId
          })}
        />
      </div>
      <PageHeader title={`Processing ${report?.companyName}`} subTitle={processingStatus} />
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <Progress percent={percentage} format={(percent) => `${percent}%`} />
        {isReportCreated && (
          <ButtonLink
            to={getRouteWithParams(ROUTES.companies.reports.report.index, {
              companyId,
              reportId: report?.id
            })}
          >
            Check out the report
          </ButtonLink>
        )}
      </div>
    </PageContainer>
  )
}
