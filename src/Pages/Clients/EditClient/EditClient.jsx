import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'
import { ROUTES } from '../../../routes'
import React from 'react'
import { Divider } from 'antd'
import { EditClientForm } from './components/EditClientForm/EditClientForm'
import { useGetClient } from '../api/ClientApiQuery'
import { CreateClientUserForm } from './components/CreateClientUserForm/CreateClientUserForm'

export const EditClient = () => {
  const { client } = useGetClient()

  return (
    <TitleWithBackButton title={`Edit client: ${client?.name}`} to={ROUTES.clients.index}>
      <EditClientForm />
      <Divider className="my-8" />
      <CreateClientUserForm />
      <Divider className="my-8" />
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>E-Mail</th>
            <th>Password</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/*{subCategories &&*/}
          {/*  subCategories.map((subCategory) => (*/}
          {/*    <SubCategoryEditListItem*/}
          {/*      key={subCategory.id}*/}
          {/*      subCategory={subCategory}*/}
          {/*      refetchSubCategories={refetchSubCategories}*/}
          {/*    />*/}
          {/*  ))}*/}
        </tbody>
      </table>
      <Divider className="my-2" />
    </TitleWithBackButton>
  )
}
