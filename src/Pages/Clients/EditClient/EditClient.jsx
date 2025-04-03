import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'
import { ROUTES } from '../../../routes'
import React from 'react'
import { Divider } from 'antd'
import { EditClientForm } from './components/EditClientForm/EditClientForm'
import { useGetClient } from '../api/ClientApi/ClientApiQuery'
import { CreateClientUserForm } from './components/CreateClientUserForm/CreateClientUserForm'
import { ClientUserList } from './components/ClientUserList/ClientUserList'

export const EditClient = () => {
  const { client } = useGetClient()

  return (
    <TitleWithBackButton title={client?.name} to={ROUTES.clients.index}>
      <EditClientForm />
      <Divider className="my-8" />
      <CreateClientUserForm />
      <Divider className="my-8" />
      <ClientUserList />
    </TitleWithBackButton>
  )
}
