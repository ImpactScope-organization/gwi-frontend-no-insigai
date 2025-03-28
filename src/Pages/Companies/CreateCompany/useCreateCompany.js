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
      companyId: '',
      xURL: '',
      jurisdiction: '',
      sector: '',
      annualRevenue: '',
      noOfEmployees: '',
      GHGEmissions: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      companyId: Yup.string().required(),
      xURL: Yup.string().required(),
      jurisdiction: Yup.string().required(),
      sector: Yup.string().required(),
      annualRevenue: Yup.string().required(),
      noOfEmployees: Yup.string().required(),
      GHGEmissions: Yup.string().required()
    }),
    onSubmit: async (values) => {
      await handleCreateCompany(values)
    }
  })

  const handleCreateCompany = useCallback(
    async (company) => {
      try {
        const {
          result: { companyId }
        } = await createCompany(company)
        toast.success('Company saved successfully')
        navigate(getUrlWithParameters(ROUTES.companies.reports.internal, { companyId }))
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
