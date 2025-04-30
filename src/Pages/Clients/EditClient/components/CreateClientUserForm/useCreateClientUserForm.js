import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useGetClient } from '../../../api/ClientApi/ClientApiQuery'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { createClientUser } from '../../../api/ClientUserApi/ClientUserApi'
import { useListClientUsers } from '../../../api/ClientUserApi/ClientUserApiQuery'

export const useCreateClientUserForm = () => {
  const { clientId } = useGetClient()
  const { refetchClientUsers } = useListClientUsers()

  const createClientUserFormik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    }),
    onSubmit: async (values) => {
      await handleCreateClientUser(values)
    }
  })

  const handleCreateClientUser = useCallback(
    async (clientUser) => {
      try {
        await createClientUser(clientId, clientUser)
        createClientUserFormik.resetForm()
        await refetchClientUsers()
        toast.success('Client user created successfully')
      } catch (error) {
        toast.error(`Error submitting form: ${error?.response?.data?.message}`)
      }
    },
    [clientId, createClientUserFormik, refetchClientUsers]
  )

  return {
    createClientUserFormik
  }
}
