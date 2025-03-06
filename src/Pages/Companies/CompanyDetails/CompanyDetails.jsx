import { PageHeader } from '../../../Components/Page/PageHeader/PageHeader'
import { ButtonLink } from '../../../Components/ButtonLink/ButtonLink'
import { ROUTES } from '../../../routes'
import React from 'react'
import { CategorizedListContainer } from '../../../Components/CategorizedList/CategorizedListContainer/CategorizedListContainer'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'

export const CompanyDetails = () => {
  return (
    <PageContainer>
      <PageHeader
        title="First Group Company name should be replaced"
        subTitle="Overview all of companies here"
      >
        <ButtonLink to={ROUTES.companies.create}>Edit company details</ButtonLink>
      </PageHeader>
      <CategorizedListContainer>hello</CategorizedListContainer>
    </PageContainer>
  )
}
