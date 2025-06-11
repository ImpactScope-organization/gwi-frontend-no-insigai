import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getReportComments } from './ReportCommentApi'

export const useReportComments = () => {
  const { reportId } = useParams()
  const { data, refetch } = useQuery({
    queryKey: ['useReportComments', reportId],
    queryFn: () => getReportComments(reportId),
    refetchInterval: 2000
  })

  return {
    comments: data?.data?.result,
    refetchReportComments: refetch
  }
}
