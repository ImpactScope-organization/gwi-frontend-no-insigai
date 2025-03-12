import { toFixed } from '../../../../../../../utils/number'
import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useMemo, useState } from 'react'
import html2canvas from 'html2canvas'
import axios from 'axios'
import apiUrl from '../../../../../../../utils/baseURL'
import { toast } from 'react-toastify'
import { getRouteWithParams, ROUTES } from '../../../../../../../routes'
import { captureScreen } from '../../../../../../../utils/helpers'
import { useCurrentCompanyReport } from '../../../hooks/useCurrentCompanyReport'

export const useQuantitativeReportDetails = () => {
  const navigate = useNavigate()
  const { companyId } = useParams()
  const { getCurrentCompanyReport, currentCompanyReport, reportId } = useCurrentCompanyReport()

  const [isSendToBlockchainInProgress, setIsSendToBlockchainInProgress] = useState(false)

  const greenwashingRiskPercentage = toFixed(currentCompanyReport?.greenwashRiskPercentage)
  const reportingRiskPercentage = toFixed(currentCompanyReport?.reportingRiskPercentage)

  const storedOnBlockchain =
    currentCompanyReport?.blockchainFileURL && currentCompanyReport?.blockchainTransactionURL

  const handleSendToBlockchain = useCallback(async () => {
    setIsSendToBlockchainInProgress(true)
    try {
      const element = document.querySelector('#report-container')

      const canvas = await html2canvas(element)
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'))

      const file = new File([blob], 'fileName.jpg', { type: 'image/jpeg' })
      const formData = new FormData()
      formData.append('file', file)

      await axios.post(`${apiUrl}/api/blockchain/create/${reportId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: '*/*',
          'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
        }
      })
      await getCurrentCompanyReport()
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message)
      } else {
        toast(error.message)
      }
    } finally {
      setIsSendToBlockchainInProgress(false)
    }
  }, [getCurrentCompanyReport, reportId])

  const deleteCompanyHandler = useCallback(async () => {
    if (
      window.confirm(
        `Are you sure you want to delete this Report? \n${currentCompanyReport?.companyName}`
      )
    ) {
      const response = await axios.delete(`${apiUrl}/api/report/delete/${currentCompanyReport?.id}`)
      const { data } = response
      if (data?.status === 'success') {
        toast.success(data?.message)
        navigate(
          getRouteWithParams(ROUTES.companies.reports.internal, {
            companyId
          })
        )
      } else {
        toast.error('something went wrong while deleting the report')
      }
    }
  }, [companyId, currentCompanyReport, navigate])

  const dropdownConfiguration = useMemo(() => {
    return {
      items: [
        {
          label: 'Modify Report',
          onClick: () => {
            navigate(
              getRouteWithParams(ROUTES.companies.reports.report.edit, {
                companyId,
                reportId
              })
            )
          }
        },
        {
          label: 'Save as PDF',
          onClick: () => {
            captureScreen('report-container', currentCompanyReport?.companyName)
          }
        },
        { label: 'Remove from DB', onClick: deleteCompanyHandler }
      ]
    }
  }, [companyId, currentCompanyReport?.companyName, deleteCompanyHandler, navigate, reportId])

  return {
    greenwashingRiskPercentage,
    reportingRiskPercentage,
    handleSendToBlockchain,
    isSendToBlockchainInProgress,
    deleteCompanyHandler,
    dropdownConfiguration,
    storedOnBlockchain
  }
}
