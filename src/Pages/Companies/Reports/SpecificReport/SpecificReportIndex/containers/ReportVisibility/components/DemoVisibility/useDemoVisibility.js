import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../../../../../../../../utils/baseURL'
import { toast } from 'react-toastify'
import { useCurrentCompanyReport } from '../../../../../hooks/useCurrentCompanyReport'

export const useDemoVisibility = () => {
  const { currentCompanyReport, getCurrentCompanyReport } = useCurrentCompanyReport()

  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    setIsDemo(!!currentCompanyReport?.isDemo)
  }, [currentCompanyReport])

  const handleIsDemoChange = useCallback(
    async (val) => {
      setIsDemo(val)
      try {
        const response = await axios.put(
          `${apiUrl}/api/report/update/${currentCompanyReport?.id}`,
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

  return {
    isDemo,
    handleIsDemoChange
  }
}
