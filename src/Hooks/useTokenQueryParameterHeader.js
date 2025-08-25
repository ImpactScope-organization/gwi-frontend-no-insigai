import { useQueryParams } from './useQueryParams'
import { useMemo } from 'react'

export const useTokenQueryParameterHeader = () => {
  const { queryParams } = useQueryParams()

  const headers = useMemo(() => {
    return {
      'content-type': 'application/json',
      Authorization: `Bearer ${queryParams.get('token')}`
    }
  }, [queryParams])

  return { headers }
}
