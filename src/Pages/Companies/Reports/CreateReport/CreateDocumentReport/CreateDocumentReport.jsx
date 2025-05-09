import { CreateReportContainer } from '../components/CreateReportContainer'
import { useCreateDocumentReport } from './useCreateDocumentReport'

export const CreateDocumentReport = () => {
  useCreateDocumentReport()
  return <CreateReportContainer>Create document report</CreateReportContainer>
}
