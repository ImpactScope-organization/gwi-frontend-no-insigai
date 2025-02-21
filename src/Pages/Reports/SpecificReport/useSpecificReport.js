import { useNavigate, useParams } from 'react-router-dom'
import { useGetCompanyReport } from '../../../Hooks/reports-hooks'
import { useCallback, useEffect, useState } from 'react'
import { toFixed } from '../../../utils/number'
import html2canvas from 'html2canvas'
import axios from 'axios'
import apiUrl from '../../../utils/baseURL'
import { toast } from 'react-toastify'
import { ROUTES } from '../../../routes'
import { captureScreen } from '../../../utils/helpers'
import { getUrlWithParameters } from '../../../utils/route'
import { formattedDate } from '../../../utils/date'

export const useSpecificReport = () => {
  const navigate = useNavigate()

  const { id: reportId } = useParams()

  const {
    refetch: getCurrentCompanyReport,
    data: currentCompanyReport,
    isLoading: currentCompanyReportIsLoading
  } = useGetCompanyReport(reportId)

  const [isRegulator, setIsRegulator] = useState(false)
  const [isDemo, setIsDemo] = useState(false)
  const [sources, setsources] = useState([])

  useEffect(() => {
    setIsDemo(!!currentCompanyReport?.isDemo)
    setIsRegulator(currentCompanyReport?.sentToRegulators === 'true')
    setsources(JSON.parse(currentCompanyReport?.sources || '[]'))
  }, [currentCompanyReport])

  const greenwashingRiskPercentage = toFixed(currentCompanyReport?.greenwashRiskPercentage)
  const reportingRiskPercentage = toFixed(currentCompanyReport?.reportingRiskPercentage)

  // Print Report
  const [isSendToBlockchainInProgress, setIsSendToBlockchainInProgress] = useState(false)

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

  const handleIsDemoChange = useCallback(
    async (val) => {
      setIsDemo(val)
      try {
        const response = await axios.put(
          `${apiUrl}/api/company/update/${currentCompanyReport?.id}`,
          {
            isDemo: val
          }
        )
        const { data } = response
        if (data) {
          toast.success(`Report is ${val === false ? 'removed from' : 'sent to'} demo`)
          await getCurrentCompanyReport()
        }
      } catch (error) {
        toast.error('Something went wrong.')
      }
    },
    [currentCompanyReport?.id, getCurrentCompanyReport]
  )

  const dropdownConfiguration = {
    onClick: (e) => {
      if (e.key === 1) {
        captureScreen('report-container', currentCompanyReport?.companyName)
      } else if (e.key === 2) {
        if (
          window.confirm(
            `Are you sure you want to delete this Report? \n${currentCompanyReport?.companyName}`
          )
        ) {
          deleteCompanyHandler()
        }
      } else {
        navigate(getUrlWithParameters(ROUTES.specificReport.edit, { id: reportId }))
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

  const handleRegulatorChange = useCallback(
    async (val) => {
      setIsRegulator(val)
      try {
        const response = await axios.put(
          `${apiUrl}/api/company/update/${currentCompanyReport?.id}`,
          {
            sentToRegulators: val,
            sendToRegulatorsTimeStamp: formattedDate,
            pending:
              (currentCompanyReport?.reviewing === 'false' || !currentCompanyReport?.reviewing) &&
              (currentCompanyReport?.reviewed === 'false' || !currentCompanyReport?.reviewed) &&
              (currentCompanyReport?.disregard === 'false' || !currentCompanyReport?.disregard)
                ? 'true'
                : 'false'
          }
        )
        const { data } = response
        if (data) {
          toast.success(`Report is ${val === false ? 'removed from' : 'sent to'} regulator`)
        }
      } catch (error) {
        toast.error('Something went wrong.')
      }
    },
    [currentCompanyReport]
  )

  return {
    currentCompanyReport,
    currentCompanyReportIsLoading,
    isRegulator,
    isDemo,
    sources,
    greenwashingRiskPercentage,
    reportingRiskPercentage,
    blockchainTransactionURL,
    blockchainFileURL,
    handleSendToBlockchain,
    isSendToBlockchainInProgress,
    deleteCompanyHandler,
    handleIsDemoChange,
    dropdownConfiguration,
    handleRegulatorChange
  }
}
