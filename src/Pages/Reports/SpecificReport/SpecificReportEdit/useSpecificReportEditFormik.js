import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useFillFormik } from '../../../../Hooks/useFillFormik'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useCurrentCompanyReport } from '../hooks/useCurrentCompanyReport'
import axios from 'axios'
import apiUrl from '../../../../utils/baseURL'

export const useSpecificReportEditFormik = () => {
  const { getCurrentCompanyReport, reportId, currentCompanyReport } = useCurrentCompanyReport()

  const editSpecificReportFormik = useFormik({
    initialValues: {
      contradiction: '',
      potentialInconsistencies: '',
      unsubstantiatedClaims: '',
      greenwashRiskPercentage: 0,
      reportingRiskPercentage: 0,
      jurisdiction: '',
      sector: '',
      annualRevenue: '',
      noOfEmployees: '',
      GHGEmissions: ''
    },
    validationSchema: Yup.object({
      contradiction: Yup.string().required(),
      potentialInconsistencies: Yup.string().required(),
      unsubstantiatedClaims: Yup.string().required(),
      greenwashRiskPercentage: Yup.number().max(100).min(0).required(),
      reportingRiskPercentage: Yup.number().max(100).min(0).required(),
      jurisdiction: Yup.string().required(),
      sector: Yup.string().required(),
      annualRevenue: Yup.string().required(),
      noOfEmployees: Yup.string().required(),
      GHGEmissions: Yup.string().required()
    }),
    onSubmit: async (values) => {
      await handleUpdateReport(values)
    }
  })

  const { resetFormikFilled } = useFillFormik(editSpecificReportFormik, currentCompanyReport)

  const handleUpdateReport = useCallback(
    async (currentCompanyReportForm) => {
      try {
        await axios.put(`${apiUrl}/api/company/update/${reportId}`, currentCompanyReportForm)
        await getCurrentCompanyReport()
        resetFormikFilled()
        toast.success('Report saved successfully')
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    },
    [getCurrentCompanyReport, reportId, resetFormikFilled]
  )

  return {
    editSpecificReportFormik
  }
}
