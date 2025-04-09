import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchClientUserList } from './ClientUserApi'

export const useListClientUsers = () => {
  const { clientId } = useParams()
  const { data, refetch: refetchClientUsers } = useQuery({
    queryKey: ['listClientUsers', clientId],
    queryFn: () => fetchClientUserList(clientId),
    staleTime: 60000
  })

  return {
    clientId,
    clientUsers: data?.result,
    refetchClientUsers
  }
}
