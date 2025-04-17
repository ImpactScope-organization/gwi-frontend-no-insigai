import React from 'react'
import { InputText } from '../../../../../../Components/Fields/InputText'
import { InputPassword } from '../../../../../../Components/Fields/InputPassword'
import { useEditClientUserListItem } from './useEditClientUserListItem'
import { Form, FormikProvider } from 'formik'
import { SuccessButton } from '../../../../../../Components/Buttons/SuccessButton'
import { DangerButton } from '../../../../../../Components/Buttons/DangerButton'

export const EditClientUserListItem = ({ clientUser }) => {
  const { editClientUserListItemFormik, handleRemoveClientUser } = useEditClientUserListItem({
    clientUser
  })
  return (
    <FormikProvider value={editClientUserListItemFormik}>
      <Form>
        <div className="flex flex-row gap-4 mb-4">
          <InputText name="email" label="E-Mail" />
          <InputPassword name="password" label="Password" />
          <InputPassword name="passwordAgain" label="Password Again" />

          <div className="mt-7 flex gap-4">
            <SuccessButton type="submit">Save</SuccessButton>
            <DangerButton onClick={handleRemoveClientUser}>Remove</DangerButton>
          </div>
        </div>
      </Form>
    </FormikProvider>
  )
}
