import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'

export const useQueryParams = () => {
  const { search } = useLocation()

  const queryParams = useMemo(() => new URLSearchParams(search), [search])

  return { queryParams }
}
