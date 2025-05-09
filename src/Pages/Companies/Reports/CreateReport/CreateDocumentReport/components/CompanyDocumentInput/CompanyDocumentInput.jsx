import { useGetCompanyDocuments } from '../../../../../api/CompanyApiQuery'
import { Select } from 'antd'
import { useMemo, useState } from 'react'
import { CategorySelectGroupTitle } from '../../../../../../Prompts/components/CategorySelect/components/CategorySelectGroupTitle'

export const CompanyDocumentInput = () => {
  const { companyDocuments } = useGetCompanyDocuments()
  const [year, setYear] = useState()

  const yearDocuments = useMemo(
    () => companyDocuments?.find((document) => document.year === year)?.documents,
    [companyDocuments, year]
  )

  return (
    <div>
      <CategorySelectGroupTitle>Documents</CategorySelectGroupTitle>
      <div className="w-full flex gap-4">
        <Select
          className="w-full"
          onChange={(yearToSet) => {
            setYear(yearToSet)
          }}
        >
          {companyDocuments &&
            companyDocuments.map(({ year }) => (
              <Select.Option key={`company_document_${year}`} value={year}>
                {year}
              </Select.Option>
            ))}
        </Select>
        <Select
          className="w-full"
          onChange={(yearToSet) => {
            setYear(yearToSet)
          }}
        >
          {yearDocuments &&
            yearDocuments.map(({ documentId, title }) => (
              <Select.Option key={documentId} value={documentId}>
                {title}
              </Select.Option>
            ))}
        </Select>
      </div>
    </div>
  )
}
