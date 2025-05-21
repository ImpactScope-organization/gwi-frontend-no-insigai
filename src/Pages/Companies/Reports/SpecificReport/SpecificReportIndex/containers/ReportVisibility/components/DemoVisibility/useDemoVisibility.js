import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useCurrentCompanyReport } from '../../../../../hooks/useCurrentCompanyReport'
import { getApi } from '../../../../../../../../../utils/api'

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
        const response = await (
          await getApi()
        ).put(`/api/report/update/${currentCompanyReport?.id}`, {
          isDemo: val
        })
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
