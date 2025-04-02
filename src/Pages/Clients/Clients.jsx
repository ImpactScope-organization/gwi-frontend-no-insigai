import { PageHeader } from '../../Components/Page/PageHeader/PageHeader'
import { ButtonLink } from '../../Components/ButtonLink/ButtonLink'
import { getRouteWithParams, ROUTES } from '../../routes'
import { CategorizedListContainer } from '../../Components/CategorizedList/CategorizedListContainer/CategorizedListContainer'
import React from 'react'
import { PageContainer } from '../../Components/Page/PageContainer/PageContainer'
import { CategorizedListItemLink } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemLink'
import { CategorizedListItemDate } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemDate'
import { handleDateFormat } from '../../utils/date'
import { CategorizedListItemTitle } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemTitle'
import { useFetchClientList } from './api/ClientApiQuery'

export const Clients = () => {
  const { data } = useFetchClientList()

  return (
    <PageContainer>
      <PageHeader title="Clients" subTitle="Overview all of clients here">
        <ButtonLink to={ROUTES.clients.create}>Add new client</ButtonLink>
      </PageHeader>
      <CategorizedListContainer>
        {!data ||
          (data?.length === 0 && (
            <h1 className="w-[calc(100vw-100px text-center)]">
              No records found. Please add a new client.
            </h1>
          ))}
        {data &&
          data?.length > 0 &&
          data?.map((client) => (
            <CategorizedListItemLink
              to={getRouteWithParams(ROUTES.clients.edit, {
                id: client?.id
              })}
              key={`client_list_item_${client?.id}`}
            >
              <CategorizedListItemDate>
                {handleDateFormat(client?.createdAt)}
              </CategorizedListItemDate>
              <CategorizedListItemTitle>{client?.name}</CategorizedListItemTitle>
            </CategorizedListItemLink>
          ))}
      </CategorizedListContainer>
    </PageContainer>
  )
}
