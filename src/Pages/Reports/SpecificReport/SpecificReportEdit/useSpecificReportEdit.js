import { useNavigate } from 'react-router-dom'
import { useCurrentCompanyReport } from '../hooks/useCurrentCompanyReport'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getUrlWithParameters } from '../../../../utils/route'
import { ROUTES } from '../../../../routes'
import { toast } from 'react-toastify'
import axios from 'axios'
import apiUrl from '../../../../utils/baseURL'

export const useSpecificReportEdit = () => {
  const navigate = useNavigate()

  const { reportId, currentCompanyReport, currentCompanyReportIsLoading, getCurrentCompanyReport } =
    useCurrentCompanyReport()

  const specificReportURL = useMemo(
    () => getUrlWithParameters(ROUTES.specificReport.index, { id: reportId }),
    [reportId]
  )

  const isModifying = true
  const [modifyData, setModifyData] = useState({})

  useEffect(() => {
    setModifyData({
      ...currentCompanyReport,
      sources: currentCompanyReport?.sources ? JSON.parse(currentCompanyReport?.sources) : []
    })
  }, [currentCompanyReport])

  const handleInputUpdates = (name, value) => {
    setModifyData((prev) => ({ ...prev, [name]: value }))
  }

  const submitUpdateReport = useCallback(async () => {
    if (modifyData?.contradiction === '') {
      return toast.warn('Contradictions field cannot be empty.')
    } else if (modifyData?.potentialInconsistencies === '') {
      return toast.warn('Potential Inconsistencies field cannot be empty.')
    } else if (modifyData?.unsubstantiatedClaims === '') {
      return toast.warn('Unsubstantiated Claims field cannot be empty.')
    } else if (!modifyData?.greenwashRiskPercentage || isNaN(modifyData?.greenwashRiskPercentage)) {
      return toast.warn('Greenwash Risk  field cannot be empty.')
    } else if (!modifyData?.reportingRiskPercentage || isNaN(modifyData?.reportingRiskPercentage)) {
      return toast.warn('Reporting Risk field cannot be empty.')
    } else if (modifyData?.jurisdiction === '') {
      return toast.warn('Jurisdiction field cannot be empty.')
    } else if (modifyData?.sector === '') {
      return toast.warn('Sector field cannot be empty.')
    } else if (modifyData?.annualRevenue === '') {
      return toast.warn('Annual Revenue field cannot be empty.')
    } else if (modifyData?.noOfEmployees === '') {
      return toast.warn('no.of employees field cannot be empty.')
    } else if (modifyData?.GHGEmissions === '') {
      return toast.warn('GHG Emissions field cannot be empty.')
    }
    try {
      const response = await axios.put(`${apiUrl}/api/company/update/${currentCompanyReport?.id}`, {
        ...modifyData,
        sources: JSON.stringify(modifyData?.sources)
      })
      const { data } = response
      if (data) {
        toast.success('Successfully updated the report.')
      }
      await getCurrentCompanyReport()

      setModifyData(null)
    } catch (error) {
      toast.error('Something went wrong while updating the report.')
      setModifyData(null)
    }
    navigate(specificReportURL)
  }, [currentCompanyReport?.id, getCurrentCompanyReport, modifyData, navigate, specificReportURL])

  return {
    isModifying,
    modifyData,
    setModifyData,
    handleInputUpdates,
    submitUpdateReport,
    specificReportURL
  }
}
