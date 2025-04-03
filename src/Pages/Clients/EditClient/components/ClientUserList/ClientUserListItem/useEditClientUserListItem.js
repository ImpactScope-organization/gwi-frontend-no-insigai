import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useFillFormik } from '../../../../../../Hooks/useFillFormik'
import { useCallback } from 'react'
import { updateClient } from '../../../../api/ClientApi/ClientApi'
import { toast } from 'react-toastify'

export const useEditClientUserListItem = ({ clientUser }) => {
  const editClientUserListItemFormik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    }),
    onSubmit: async (values) => {
      console.log(values)
      await handleEditClientUserListItem(values)
    }
  })
  const { resetFormikFilled } = useFillFormik(editClientUserListItemFormik, clientUser)

  const handleEditClientUserListItem = useCallback(
    async (clientUser) => {
      try {
        // await updateClient(clientUser.id, client)
        toast.success(`Client user ${clientUser.email} saved successfully`)
        // await refetchClient()
        resetFormikFilled()
      } catch (error) {
        console.error('Error submitting form:', error)
        toast.error('Error submitting form:', error)
      }
    },
    [clientUser, resetFormikFilled]
  )

  return {
    editClientUserListItemFormik
  }
}
