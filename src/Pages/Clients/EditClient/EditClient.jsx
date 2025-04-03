import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'
import { ROUTES } from '../../../routes'
import React from 'react'
import { Divider } from 'antd'
import { EditClientForm } from './components/EditClientForm/EditClientForm'
import { CreateClientUserForm } from './components/CreateClientUserForm/CreateClientUserForm'
import { ClientUserList } from './components/ClientUserList/ClientUserList'

export const EditClient = () => {
  return (
    <TitleWithBackButton to={ROUTES.clients.index}>
      <EditClientForm />
      <Divider className="my-8" />
      <CreateClientUserForm />
      <Divider className="my-8" />
      <ClientUserList />
    </TitleWithBackButton>
  )
}
