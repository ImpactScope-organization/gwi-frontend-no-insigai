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
      contradiction: Yup.string().required('Contradictions field cannot be empty.'),
      potentialInconsistencies: Yup.string().required(
        'Potential Inconsistencies field cannot be empty.'
      ),
      unsubstantiatedClaims: Yup.string().required('Unsubstantiated Claims field cannot be empty.'),
      greenwashRiskPercentage: Yup.string().required('Greenwashing Risk field cannot be empty.'),
      reportingRiskPercentage: Yup.string().required('Reporting Risk field cannot be empty.'),
      jurisdiction: Yup.string().required('Jurisdiction field cannot be empty.'),
      sector: Yup.string().required('Sector field cannot be empty.'),
      annualRevenue: Yup.string().required('Annual Revenue field cannot be empty.'),
      noOfEmployees: Yup.string().required('No. of Employees field cannot be empty.'),
      GHGEmissions: Yup.string().required('GHG Emissions field cannot be empty.')
    }),
    onSubmit: async (values) => {
      await handleSubmitEditPromptCategory(values)
    }
  })

  const { resetFormikFilled } = useFillFormik(editSpecificReportFormik, currentCompanyReport)

  const handleSubmitEditPromptCategory = useCallback(
    async (currentCompanyReportForm) => {
      try {
        await axios.put(`${apiUrl}/api/company/update/${reportId}`, {
          ...currentCompanyReportForm,
          sources: JSON.stringify(currentCompanyReportForm?.sources)
        })
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
