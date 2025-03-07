import { PageHeader } from '../../Components/Page/PageHeader/PageHeader'
import { ButtonLink } from '../../Components/ButtonLink/ButtonLink'
import { getRouteWithId, getRouteWithParams, ROUTES } from '../../routes'
import { CategorizedListContainer } from '../../Components/CategorizedList/CategorizedListContainer/CategorizedListContainer'
import React from 'react'
import { PageContainer } from '../../Components/Page/PageContainer/PageContainer'
import { CategorizedListItemLink } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemLink'
import { CategorizedListItemDate } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemDate'
import { handleDateFormat } from '../../utils/date'
import { CategorizedListItemTitle } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemTitle'
import { CategorizedListItemCategoryContainer } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategoryContainer'
import { CategorizedListItemCategory } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategory'
import { useQuery } from '@tanstack/react-query'
import { fetchCompanyList } from './api/CompanyApi'

export const Companies = () => {
  const { data } = useQuery({
    queryKey: ['fetchCompanyList'],
    queryFn: () => fetchCompanyList()
  })

  return (
    <PageContainer>
      <PageHeader title="Companies" subTitle="Overview all of companies here">
        <ButtonLink to={ROUTES.companies.create}>Add new company</ButtonLink>
      </PageHeader>
      <CategorizedListContainer>
        {!data ||
          (data?.length === 0 && (
            <h1 className="w-[calc(100vw-100px text-center)]">
              No records found. Please add a new company.
            </h1>
          ))}
        {data &&
          data?.length > 0 &&
          data?.map((company) => (
            <CategorizedListItemLink
              to={getRouteWithParams(ROUTES.companies.reports.internal, {
                companyId: company?.companyId
              })}
              key={`company_list_item_${company?.id}`}
            >
              <CategorizedListItemDate>
                {handleDateFormat(company?.createdAt)}
              </CategorizedListItemDate>
              <CategorizedListItemTitle>{company?.name}</CategorizedListItemTitle>
              <CategorizedListItemCategoryContainer>
                <div>Company Id:</div>
                <CategorizedListItemCategory>{company?.companyId}</CategorizedListItemCategory>
              </CategorizedListItemCategoryContainer>
            </CategorizedListItemLink>
          ))}
      </CategorizedListContainer>
    </PageContainer>
  )
}
