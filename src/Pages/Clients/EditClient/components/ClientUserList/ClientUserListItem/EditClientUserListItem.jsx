import { InputText } from '../../../../../../Components/Fields/InputText'
import { InputPassword } from '../../../../../../Components/Fields/InputPassword'
import React from 'react'
import { useEditClientUserListItem } from './useEditClientUserListItem'
import { Form, FormikProvider } from 'formik'
import { SuccessButton } from '../../../../../../Components/Buttons/SuccessButton'

export const EditClientUserListItem = ({ clientUser }) => {
  const { editClientUserListItemFormik } = useEditClientUserListItem({ clientUser })
  return (
    <FormikProvider value={editClientUserListItemFormik}>
      <Form>
        <div className="hover:bg-green-100 flex flex-row gap-4 mb-4">
          <InputText name="email" label="E-Mail" />
          <InputPassword name="password" label="Password" />

          <div className="mt-7">
            <SuccessButton type="submit">Save</SuccessButton>
          </div>
        </div>
      </Form>
    </FormikProvider>
  )
}
