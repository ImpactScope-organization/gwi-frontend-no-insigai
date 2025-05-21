import React from 'react'
import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'
import { ROUTES } from '../../../routes'
import { Form, FormikProvider } from 'formik'
import { InputText } from '../../../Components/Fields/InputText'
import { SuccessButton } from '../../../Components/Buttons/SuccessButton'
import { CheckSquareFilled } from '@ant-design/icons'
import { useCreateClient } from './useCreateClient'

export const CreateClient = () => {
  const { createClientFormik } = useCreateClient()

  return (
    <TitleWithBackButton title="New Client" to={ROUTES.clients.index}>
      <FormikProvider value={createClientFormik}>
        <Form>
          <div className="flex flex-col lg:w-2/3 xl:w-1/2 gap-4">
            <InputText name="name" label="Name" />

            <SuccessButton onClick={createClientFormik.submitForm} icon={<CheckSquareFilled />}>
              Save client
            </SuccessButton>
          </div>
        </Form>
      </FormikProvider>
    </TitleWithBackButton>
  )
}
