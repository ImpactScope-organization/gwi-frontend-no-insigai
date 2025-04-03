import { Form, FormikProvider } from 'formik'
import { InputText } from '../../../../../Components/Fields/InputText'
import { SuccessButton } from '../../../../../Components/Buttons/SuccessButton'
import { CheckSquareFilled } from '@ant-design/icons'
import React from 'react'
import { useEditClientForm } from './useEditClientForm'
import { FormHeading } from '../../../../../Components/Text/FormHeading'

export const EditClientForm = () => {
  const { editClientFormik } = useEditClientForm()

  return (
    <FormikProvider value={editClientFormik}>
      <Form>
        <div className="flex flex-col w-full gap-4">
          <FormHeading>Edit client</FormHeading>
          <div className="flex flex-col w-full gap-4">
            <InputText name="name" label="Name" />
          </div>

          <div className="flex w-full gap-4">
            <SuccessButton onClick={editClientFormik.submitForm} icon={<CheckSquareFilled />}>
              Save client
            </SuccessButton>
          </div>
        </div>
      </Form>
    </FormikProvider>
  )
}
