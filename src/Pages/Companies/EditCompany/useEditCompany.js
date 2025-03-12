import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useGetCompany } from '../api/CompanyApiQuery'
import { useFillFormik } from '../../../Hooks/useFillFormik'

export const useEditCompany = () => {
  const { companyId } = useParams()
  const navigate = useNavigate()
  const { data, refetch: refetchCompany } = useGetCompany(companyId)
  const company = data?.result

  console.log(company)

  const editCompanyFormik = useFormik({
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
  const { resetFormikFilled } = useFillFormik(editCompanyFormik, company)

  const handleCreateCompany = useCallback(
    async (company) => {
      try {
        //  edit company
        // const {
        //   result: { companyId }
        // } = await createCompany(company)
        toast.success('Company saved successfully')
        await refetchCompany()
        resetFormikFilled()
      } catch (error) {
        console.error('Error submitting form:', error)
        toast.error('Error submitting form:', error)
      }
    },
    [refetchCompany, resetFormikFilled]
  )

  return {
    editCompanyFormik
  }
}
