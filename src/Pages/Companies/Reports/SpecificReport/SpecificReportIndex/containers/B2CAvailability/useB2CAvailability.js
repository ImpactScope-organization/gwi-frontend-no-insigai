import { useMemo } from 'react'
import { useCurrentCompanyReport } from '../../../hooks/useCurrentCompanyReport'

export const useB2CAvailability = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()

  const b2cAvailabilityItems = useMemo(() => {
    return [
      {
        id: 'b2c_free',
        name: 'B2C Free'
      },
      {
        id: 'b2c_premium',
        name: 'B2C Premium'
      }
    ].map((item) => ({
      ...item,
      isSelected: currentCompanyReport?.b2cAvailability?.includes(item.id) || false
    }))
  }, [currentCompanyReport?.b2cAvailability])

  return {
    b2cAvailabilityItems
  }
}
