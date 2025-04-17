import { FormHeading } from '../../../../../Components/Text/FormHeading'
import { SuccessButton } from '../../../../../Components/Buttons/SuccessButton'
import { CheckSquareFilled } from '@ant-design/icons'
import React from 'react'
import { InputUserSearch } from './components/InputUserSearch/InputUserSearch'
import { useAddExistingUserToClientForm } from './useAddExistingUserToClientForm'
import { Form, FormikProvider } from 'formik'

export const AddExistingUserToClientForm = () => {
  const { addExistingUserToClientFormik } = useAddExistingUserToClientForm()

  return (
    <FormikProvider value={addExistingUserToClientFormik}>
      <Form>
        <div className="flex flex-col w-full gap-4">
          <FormHeading>Add existing user to client</FormHeading>
          <div className="flex flex-row w-full gap-4">
            <InputUserSearch name="id" />
          </div>
          <SuccessButton
            onClick={addExistingUserToClientFormik.submitForm}
            icon={<CheckSquareFilled />}
          >
            Add user to client
          </SuccessButton>
        </div>
      </Form>
    </FormikProvider>
  )
}
