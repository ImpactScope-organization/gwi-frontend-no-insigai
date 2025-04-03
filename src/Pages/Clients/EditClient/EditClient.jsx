import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'
import { ROUTES } from '../../../routes'
import { Form, FormikProvider } from 'formik'
import { InputText } from '../../../Components/Fields/InputText'
import { SuccessButton } from '../../../Components/Buttons/SuccessButton'
import { CheckSquareFilled } from '@ant-design/icons'
import React from 'react'
import { useEditClient } from './useEditClient'
import { Divider } from 'antd'
import { EditClientForm } from './components/EditClientForm'

export const EditClient = () => {
  const { editClientFormik, client } = useEditClient()

  return (
    <TitleWithBackButton title={`Edit client: ${client?.name}`} to={ROUTES.clients.index}>
      <FormikProvider value={editClientFormik}>
        <EditClientForm />
      </FormikProvider>
      <Divider className="my-2" />
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
