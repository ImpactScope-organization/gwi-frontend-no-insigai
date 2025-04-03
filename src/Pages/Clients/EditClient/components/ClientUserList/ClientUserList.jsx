import React from 'react'
import { useListClientUsers } from '../../../api/ClientUserApi/ClientUserApiQuery'
import { EditClientUserListItem } from './ClientUserListItem/EditClientUserListItem'
import { FormHeading } from '../../../../../Components/Text/FormHeading'

export const ClientUserList = () => {
  const { clientUsers } = useListClientUsers()
  return (
    <div>
      <FormHeading>Edit existing client users</FormHeading>
      <div>
        {clientUsers &&
          clientUsers.map((clientUser) => (
            <EditClientUserListItem key={clientUser.id} clientUser={clientUser} />
          ))}
      </div>
    </div>
  )
}
