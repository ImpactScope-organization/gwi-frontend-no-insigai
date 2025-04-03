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
  const { clientId } = useParams()
  const { data, refetch: refetchClient } = useQuery({
    queryKey: ['getClient', clientId],
    queryFn: () => getClient(clientId),
    staleTime: 60000
  })

  return {
    clientId,
    client: data?.result,
    refetchClient
  }
}
