import { useMemo } from 'react'

export const useB2CAvailability = () => {
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
    ]
  }, [])

  return {
    b2cAvailabilityItems
  }
}
