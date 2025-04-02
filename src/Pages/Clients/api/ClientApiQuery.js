import { fetchClientList } from './ClientApi'
import { useQuery } from '@tanstack/react-query'

export const useFetchClientList = () => {
  return useQuery({
    queryKey: ['fetchClientList'],
    queryFn: () => fetchClientList()
  })
}
