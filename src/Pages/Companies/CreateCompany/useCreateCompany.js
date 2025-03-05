import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { getUrlWithParameters } from '../../../utils/route'
import { ROUTES } from '../../../routes'
import { createCompany } from '../api/CompanyApi'

export const useCreateCompany = () => {
  const navigate = useNavigate()

  const createCompanyFormik = useFormik({
    initialValues: {
      name: '',
      companyId: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      companyId: Yup.string().required()
    }),
    onSubmit: async (values) => {
      await handleCreateCompany(values)
    }
  })

  const handleCreateCompany = useCallback(
    async (company) => {
      try {
        const {
          result: { id }
        } = await createCompany(company)
        toast.success('Company saved successfully')
        navigate(getUrlWithParameters(ROUTES.companies.details, { id }))
      } catch (error) {
        console.error('Error submitting form:', error)
        toast.error('Error submitting form:', error)
      }
    },
    [navigate]
  )

  return {
    createCompanyFormik
  }
}
