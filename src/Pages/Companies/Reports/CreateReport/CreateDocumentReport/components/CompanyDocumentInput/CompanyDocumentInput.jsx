import { useGetCompanyDocuments } from '../../../../../api/CompanyApiQuery'

export const CompanyDocumentInput = () => {
  const { companyDocuments } = useGetCompanyDocuments()

  return <div>CompanyDocumentInput</div>
}
