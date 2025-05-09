import { useGetCompanyDocuments } from '../../../api/CompanyApiQuery'

export const useCreateDocumentReport = () => {
  const { companyDocuments } = useGetCompanyDocuments()
  return { companyDocuments }
}
