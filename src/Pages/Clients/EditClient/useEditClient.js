import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useFillFormik } from '../../../Hooks/useFillFormik'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useGetClient } from '../api/ClientApiQuery'
import { updateClient } from '../api/ClientApi'

export const useEditClient = () => {
  const { client, clientId, refetchClient } = useGetClient()

  const editClientFormik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required()
    }),
    onSubmit: async (values) => {
      await handleEditClient(values)
    }
  })
  const { resetFormikFilled } = useFillFormik(editClientFormik, client)

  const handleEditClient = useCallback(
    async (client) => {
      try {
        await updateClient(clientId, client)
        toast.success('Client saved successfully')
        await refetchClient()
        resetFormikFilled()
      } catch (error) {
        console.error('Error submitting form:', error)
        toast.error('Error submitting form:', error)
      }
    },
    [clientId, refetchClient, resetFormikFilled]
  )

  return {
    editClientFormik,
    client
  }
}
