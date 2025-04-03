import { useCreateClientUserForm } from './useCreateClientUserForm'
import { Form, FormikProvider } from 'formik'
import { InputText } from '../../../../../Components/Fields/InputText'
import { SuccessButton } from '../../../../../Components/Buttons/SuccessButton'
import { CheckSquareFilled } from '@ant-design/icons'
import React from 'react'
import { InputPassword } from '../../../../../Components/Fields/InputPassword'

export const CreateClientUserForm = () => {
  const { createClientUserFormik } = useCreateClientUserForm()

  return (
    <FormikProvider value={createClientUserFormik}>
      <div className="flex flex-col w-full gap-4 lg:flex-row">
        <Form className="flex flex-col gap-4 w-full">
          <div className="flex flex-col lg:w-2/3 xl:w-1/2 gap-4">
            <h1 className="mb-2 font-bold text-2xl">Create new user for client</h1>
            <div className="flex flex-row w-full gap-4 items-end">
              <InputText name="email" label="E-Mail" />
              <InputPassword name="password" label="Password" />
              <SuccessButton
                onClick={createClientUserFormik.submitForm}
                icon={<CheckSquareFilled />}
              >
                Create user
              </SuccessButton>
            </div>
          </div>
        </Form>
      </div>
    </FormikProvider>
  )
}
