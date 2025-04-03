import { fetchClientList, getClient } from './ClientApi'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export const useFetchClientList = () => {
  return useQuery({
    queryKey: ['fetchClientList'],
    queryFn: () => fetchClientList()
  })
}

export const useGetClient = () => {
  const { id } = useParams()
  const { data, refetch: refetchClient } = useQuery({
    queryKey: ['getClient', id],
    queryFn: () => getClient(id),
    staleTime: 60000
  })

  return {
    clientId: id,
    client: data?.result,
    refetchClient
  }
}
