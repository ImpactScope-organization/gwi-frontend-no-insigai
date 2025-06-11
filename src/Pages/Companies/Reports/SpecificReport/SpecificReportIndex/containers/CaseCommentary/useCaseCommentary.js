import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCurrentCompanyReport } from '../../../hooks/useCurrentCompanyReport'
import { createReportComment } from '../../../../api/ReportCommentApi/ReportCommentApi'
import { toast } from 'react-toastify'
import { useReportComments } from '../../../../api/ReportCommentApi/ReportCommentApiQuery'

export const useCaseCommentary = () => {
  const { reportId } = useCurrentCompanyReport()

  const { comments, refetchReportComments } = useReportComments()

  const caseCommentaryFormik = useFormik({
    initialValues: {
      comment: ''
    },
    validationSchema: Yup.object({
      comment: Yup.string().required()
    }),
    onSubmit: async (values) => {
      await createReportComment(reportId, values)
      // todo toast success
      caseCommentaryFormik.resetForm()
      // todo refetch comments
      await refetchReportComments()

      toast.success('Comment added successfully!')
    }
  })

  return {
    comments,
    caseCommentaryFormik
  }
}
