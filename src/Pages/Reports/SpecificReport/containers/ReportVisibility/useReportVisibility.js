import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../../../../utils/baseURL'
import { toast } from 'react-toastify'
import { formattedDate } from '../../../../../utils/date'
import { useCurrentCompanyReport } from '../../../hooks/useCurrentCompanyReport'

export const useReportVisibility = () => {
  const { currentCompanyReport, getCurrentCompanyReport } = useCurrentCompanyReport()

  const [isRegulator, setIsRegulator] = useState(false)
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    setIsDemo(!!currentCompanyReport?.isDemo)
    setIsRegulator(currentCompanyReport?.sentToRegulators === 'true')
  }, [currentCompanyReport])

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
    isRegulator,
    isDemo,
    handleIsDemoChange,
    handleRegulatorChange
  }
}
