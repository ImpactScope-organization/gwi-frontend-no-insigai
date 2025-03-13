import { useQuery } from '@tanstack/react-query'
import { getGPTModels } from './gptAPI'

export const useGetGPTModels = () => {
  return useQuery({
    queryKey: ['getGPTModels'],
    queryFn: () => getGPTModels(),
    staleTime: 60000
  })
}
