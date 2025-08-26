import { useMemo } from 'react'
import { useCurrentCompanyReport } from '../../../hooks/useCurrentCompanyReport'

export const useB2CTierAvailability = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()

  const b2cTiers = useMemo(() => {
    return [
      {
        id: 'free',
        name: 'B2C Free'
      },
      {
        id: 'premium',
        name: 'B2C Premium'
      }
    ].map((item) => ({
      ...item,
      isSelected: currentCompanyReport?.b2cTiers?.includes(item.id) || false
    }))
  }, [currentCompanyReport?.b2cTiers])

  return {
    b2cTiers
  }
}
