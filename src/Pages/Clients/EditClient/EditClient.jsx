import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'
import { ROUTES } from '../../../routes'
import React from 'react'
import { Divider } from 'antd'
import { EditClientForm } from './components/EditClientForm/EditClientForm'
import { CreateClientUserForm } from './components/CreateClientUserForm/CreateClientUserForm'
import { ClientUserList } from './components/ClientUserList/ClientUserList'
import { AddExistingUserToClientForm } from './components/AddExistingUserToClientForm/AddExistingUserToClientForm'

export const EditClient = () => {
  return (
    <TitleWithBackButton to={ROUTES.clients.index}>
      <div className="flex flex-col items-center">
        <div className="lg:w-2/3 2xl:w-1/2 gap-y-4 flex flex-col">
          <EditClientForm />
          <Divider />
          <CreateClientUserForm />
          <Divider />
          <AddExistingUserToClientForm />
          <Divider />
          <ClientUserList />
        </div>
      </div>
    </TitleWithBackButton>
  )
}
