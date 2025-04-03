import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { getUrlWithParameters } from '../../../utils/route'
import { ROUTES } from '../../../routes'
import { createClient } from '../api/ClientApi/ClientApi'

export const useCreateClient = () => {
  const navigate = useNavigate()

  const createClientFormik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required()
    }),
    onSubmit: async (values) => {
      await handleCreateClient(values)
    }
  })

  const handleCreateClient = useCallback(
    async (client) => {
      try {
        const {
          result: { id: clientId }
        } = await createClient(client)
        toast.success('Company saved successfully')
        navigate(getUrlWithParameters(ROUTES.clients.edit, { clientId }))
      } catch (error) {
        console.error('Error submitting form:', error)
        toast.error('Error submitting form:', error)
      }
    },
    [navigate]
  )

  return {
    createClientFormik
  }
}
