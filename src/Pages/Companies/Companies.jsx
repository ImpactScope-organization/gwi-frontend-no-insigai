import { PageHeader } from '../../Components/Page/PageHeader/PageHeader'
import { ButtonLink } from '../../Components/ButtonLink/ButtonLink'
import { ROUTES } from '../../routes'
import { CategorizedListContainer } from '../../Components/CategorizedList/CategorizedListContainer/CategorizedListContainer'
import React from 'react'
import { PageContainer } from '../../Components/Page/PageContainer/PageContainer'

export const Companies = () => {
  return (
    <PageContainer>
      <PageHeader title="Companies" subTitle="Overview all of companies here">
        <ButtonLink to={ROUTES.companies.create}>Add new company</ButtonLink>
      </PageHeader>
      {/* Reports Container */}
      <CategorizedListContainer>hello</CategorizedListContainer>
    </PageContainer>
  )
}
