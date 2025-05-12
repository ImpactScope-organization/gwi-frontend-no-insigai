import { useGetCompanyDocuments } from '../../../api/CompanyApiQuery'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createDocumentReportQueueItem } from '../../api/ReportQueueApi'
import { useParams } from 'react-router-dom'

export const useCreateDocumentReport = () => {
  const { companyDocuments } = useGetCompanyDocuments()
  const { companyId } = useParams()

  const createDocumentReportFormik = useFormik({
    initialValues: {
      title: '',
      documents: []
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      documents: Yup.array().min(1).required()
    }),
    async onSubmit(values) {
      await createDocumentReportQueueItem({
        ...values,
        companyId
      })
    }
  })

  return { companyDocuments, createDocumentReportFormik }
}
