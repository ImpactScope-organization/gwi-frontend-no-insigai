import { ButtonLink } from '../../../Components/ButtonLink/ButtonLink'
import { ROUTES } from '../../../routes'
import React from 'react'
import { CategorizedListContainer } from '../../../Components/CategorizedList/CategorizedListContainer/CategorizedListContainer'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'
import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'

export const CompanyDetails = () => {
  return (
    <PageContainer>
      <TitleWithBackButton
        title="Companies"
        subTitle="Overview all of companies here"
        to={ROUTES.companies.index}
      >
        <ButtonLink to={ROUTES.companies.create}>Edit company details</ButtonLink>
      </TitleWithBackButton>
      <CategorizedListContainer>hello</CategorizedListContainer>
    </PageContainer>
  )
}
