import { useCreateClientUserForm } from './useCreateClientUserForm'
import { Form, FormikProvider } from 'formik'
import { InputText } from '../../../../../Components/Fields/InputText'
import { SuccessButton } from '../../../../../Components/Buttons/SuccessButton'
import { CheckSquareFilled } from '@ant-design/icons'
import React from 'react'
import { InputPassword } from '../../../../../Components/Fields/InputPassword'
import { FormHeading } from '../../../../../Components/Text/FormHeading'

export const CreateClientUserForm = () => {
  const { createClientUserFormik } = useCreateClientUserForm()

  return (
    <FormikProvider value={createClientUserFormik}>
      <Form>
        <div className="flex flex-col w-full gap-4">
          <FormHeading>Create new user for client</FormHeading>
          <div className="flex flex-row w-full gap-4 mb-4">
            <InputText name="email" label="E-Mail" />
            <InputPassword name="password" label="Password" />
          </div>
          <SuccessButton onClick={createClientUserFormik.submitForm} icon={<CheckSquareFilled />}>
            Create user
          </SuccessButton>
        </div>
      </Form>
    </FormikProvider>
  )
}
