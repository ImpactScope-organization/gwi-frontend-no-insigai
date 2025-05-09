import { useGetCompanyDocuments } from '../../../api/CompanyApiQuery'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const useCreateDocumentReport = () => {
  const { companyDocuments } = useGetCompanyDocuments()

  const createDocumentReportFormik = useFormik({
    initialValues: {
      title: '',
      documents: []
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      documents: Yup.array().min(1).required()
    }),
    onSubmit: (values) => {
      console.log('Form submitted with values:', values)
    }
  })

  return { companyDocuments, createDocumentReportFormik }
}
