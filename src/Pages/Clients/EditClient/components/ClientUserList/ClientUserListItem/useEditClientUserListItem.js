import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useFillFormik } from '../../../../../../Hooks/useFillFormik'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useListClientUsers } from '../../../../api/ClientUserApi/ClientUserApiQuery'
import { updateUser } from '../../../../api/UserApi/UserApi'
import { removeExistingUserToClient } from '../../../../api/ClientUserApi/ClientUserApi'
import { Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

export const useEditClientUserListItem = ({ clientUser }) => {
  const { refetchClientUsers, clientId } = useListClientUsers()
  const [{ confirm }, modalContent] = Modal.useModal()

  const editClientUserListItemFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordAgain: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string(),
      passwordAgain: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    }),
    onSubmit: async (values) => {
      await handleEditClientUserListItem(values)
    }
  })

  const { resetFormikFilled } = useFillFormik(editClientUserListItemFormik, clientUser)

  const handleEditClientUserListItem = useCallback(
    async (clientUserForm) => {
      try {
        await updateUser({
          ...clientUser,
          ...clientUserForm
        })
        toast.success(`Client user ${clientUserForm.email} saved successfully`)
        await refetchClientUsers()
        editClientUserListItemFormik.resetForm()
        resetFormikFilled()
      } catch (error) {
        console.error('Error submitting form:', error)
        toast.error(`Error submitting form: ${error?.response?.data?.message}`)
      }
    },
    [clientUser, editClientUserListItemFormik, refetchClientUsers, resetFormikFilled]
  )

  const handleRemoveClientUser = useCallback(async () => {
    confirm({
      title: `Do you want to remove "${clientUser.email}" from the user?`,
      icon: <ExclamationCircleFilled />,
      content: 'If you want to revert this action add this user again',
      async onOk() {
        try {
          await removeExistingUserToClient({
            clientId,
            id: clientUser.id
          })
          toast.success(`Client user ${clientUser.email} removed successfully`)
          await refetchClientUsers()
        } catch (error) {
          console.error('Error submitting form:', error)
          toast.error(`Error submitting form: ${error?.response?.data?.message}`)
        }
      }
    })
  }, [clientId, clientUser, confirm, refetchClientUsers])

  return {
    editClientUserListItemFormik,
    handleRemoveClientUser,
    modalContent
  }
}
