import { toFixed } from '../../../../../utils/number'
import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useMemo, useState } from 'react'
import html2canvas from 'html2canvas'
import axios from 'axios'
import apiUrl from '../../../../../utils/baseURL'
import { toast } from 'react-toastify'
import { useGetCompanyReport } from '../../../../../Hooks/reports-hooks'
import { ROUTES } from '../../../../../routes'
import { captureScreen } from '../../../../../utils/helpers'
import { getUrlWithParameters } from '../../../../../utils/route'

export const useQuantitativeReportDetails = () => {
  const navigate = useNavigate()
  const { id: reportId } = useParams()

  const { refetch: getCurrentCompanyReport, data: currentCompanyReport } =
    useGetCompanyReport(reportId)

  const [isSendToBlockchainInProgress, setIsSendToBlockchainInProgress] = useState(false)

  const greenwashingRiskPercentage = toFixed(currentCompanyReport?.greenwashRiskPercentage)
  const reportingRiskPercentage = toFixed(currentCompanyReport?.reportingRiskPercentage)
  const blockchainTransactionURL = currentCompanyReport?.blockchainTransactionURL
  const blockchainFileURL = currentCompanyReport?.blockchainFileURL

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
      const response = await axios.delete(
        `${apiUrl}/api/company/delete/${currentCompanyReport?.id}`
      )
      const { data } = response
      if (data?.status === 'success') {
        toast.success(data?.message)
        navigate(ROUTES.reports.internal)
      } else {
        toast.error('something went wrong while deleting the report')
      }
    }
  }, [currentCompanyReport, navigate])

  const dropdownConfiguration = useMemo(() => {
    return {
      onClick: ({ key }) => {
        switch (key) {
          case '1':
            captureScreen('report-container', currentCompanyReport?.companyName)
            break
          case '2':
            deleteCompanyHandler()
            break
          case '3':
            navigate(getUrlWithParameters(ROUTES.specificReport.edit, { id: reportId }))
            break
          default:
            break
        }
      },
      items: [
        { label: 'Modify Report', key: '0' },
        {
          label: 'Save as PDF',
          key: '1'
        },
        { label: 'Remove from DB', key: '2' }
      ]
    }
  }, [currentCompanyReport?.companyName, deleteCompanyHandler, navigate, reportId])

  // greenwashingRiskPercentage, *
  //   reportingRiskPercentage, *
  //   blockchainTransactionURL, *
  //   blockchainFileURL, *
  //   handleSendToBlockchain, *
  //   isSendToBlockchainInProgress, *
  //   deleteCompanyHandler, *
  //   dropdownConfiguration, *

  return {
    currentCompanyReport,
    greenwashingRiskPercentage,
    reportingRiskPercentage,
    blockchainTransactionURL,
    blockchainFileURL,
    handleSendToBlockchain,
    isSendToBlockchainInProgress,
    deleteCompanyHandler,
    dropdownConfiguration
  }
}
