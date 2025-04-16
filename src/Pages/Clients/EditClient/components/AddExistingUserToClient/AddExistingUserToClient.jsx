import { FormHeading } from '../../../../../Components/Text/FormHeading'
import { SuccessButton } from '../../../../../Components/Buttons/SuccessButton'
import { CheckSquareFilled } from '@ant-design/icons'
import React from 'react'
import { InputUserSearch } from './components/InputUserSearch'

export const AddExistingUserToClient = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <FormHeading>Add existing user to client</FormHeading>
      <div className="flex flex-row w-full gap-4">
        <InputUserSearch />
      </div>
      <SuccessButton icon={<CheckSquareFilled />}>Add user to client</SuccessButton>
    </div>
  )
}
