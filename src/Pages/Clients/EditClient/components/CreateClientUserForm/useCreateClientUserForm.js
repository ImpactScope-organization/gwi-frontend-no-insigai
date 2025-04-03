import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useGetClient } from '../../../api/ClientApiQuery'
import { useCallback } from 'react'
import { toast } from 'react-toastify'

export const useCreateClientUserForm = () => {
  const { clientId } = useGetClient()

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

  const handleCreateClientUser = useCallback(async (clientUser) => {
    try {
      // await createCompany(clientUser)
      // todo implement backend
      toast.success('Client user created successfully')
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Error submitting form:', error)
    }
  }, [])

  return {
    createClientUserFormik
  }
}
