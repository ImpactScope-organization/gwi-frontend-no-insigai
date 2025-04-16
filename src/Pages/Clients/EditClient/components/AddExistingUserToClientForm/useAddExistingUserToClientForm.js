import { useGetClient } from '../../../api/ClientApi/ClientApiQuery'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { addExistingUserToClient } from '../../../api/ClientUserApi/ClientUserApi'

export const useAddExistingUserToClientForm = () => {
  const { clientId } = useGetClient()

  const addExistingUserToClientFormik = useFormik({
    initialValues: {
      id: ''
    },
    validationSchema: Yup.object({
      id: Yup.string().required()
    }),
    onSubmit: async (values) => {
      await handleAddExistingUserToClientFormik(values)
    }
  })

  const handleAddExistingUserToClientFormik = useCallback(
    async ({ id }) => {
      try {
        await addExistingUserToClient({
          clientId,
          id
        })
        toast.success('Client user added successfully')
      } catch (error) {
        toast.error(`Error submitting form: ${error?.response?.data?.message}`)
      }
    },
    [clientId]
  )

  return {
    addExistingUserToClientFormik
  }
}
