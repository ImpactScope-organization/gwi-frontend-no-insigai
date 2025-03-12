import React from 'react'
import { getRouteWithParams, ROUTES } from '../../../../../routes'
import { ButtonLink } from '../../../../../Components/ButtonLink/ButtonLink'
import { PageContainer } from '../../../../../Components/Page/PageContainer/PageContainer'
import { PageContentContainer } from '../../../../../Components/Page/PageContentContainer/PageContentContainer'
import { CategorizedListContainer } from '../../../../../Components/CategorizedList/CategorizedListContainer/CategorizedListContainer'
import { PageTab } from '../../../../../Components/Page/PageTab/PageTab'
import { useParams } from 'react-router-dom'
import { useGetCompany } from '../../../api/CompanyApiQuery'
import { PageHeaderWithBackButton } from '../../../../../Components/Page/PageHeaderWithBackButton/PageHeaderWithBackButton'

export const ReportContainer = ({ children }) => {
  const { companyId } = useParams()
  const { data } = useGetCompany(companyId)

  return (
    <PageContainer>
      <PageHeaderWithBackButton
        title={data?.result?.name}
        subTitle={data?.result?.companyId}
        to={ROUTES.companies.index}
      >
        <ButtonLink
          to={getRouteWithParams(ROUTES.companies.reports.create, {
            companyId
          })}
        >
          Add new report
        </ButtonLink>
      </PageHeaderWithBackButton>

      {/* Tabs Container */}
      <PageContentContainer>
        <PageTab
          to={getRouteWithParams(ROUTES.companies.reports.internal, {
            companyId
          })}
        >
          Internal reports
        </PageTab>
        <PageTab
          to={getRouteWithParams(ROUTES.companies.reports.regulator, {
            companyId
          })}
        >
          Sent to regulator
        </PageTab>
        <PageTab
          to={getRouteWithParams(ROUTES.companies.reports.processing, {
            companyId
          })}
        >
          Processing reports
        </PageTab>
      </PageContentContainer>

      {/* Reports Container */}
      <CategorizedListContainer>{children}</CategorizedListContainer>
    </PageContainer>
  )
}
