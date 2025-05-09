import { useGetCompanyDocuments } from '../../../../../api/CompanyApiQuery'
import { Select } from 'antd'
import { useMemo, useState } from 'react'
import { CategorySelectGroupTitle } from '../../../../../../Prompts/components/CategorySelect/components/CategorySelectGroupTitle'
import { SuccessButton } from '../../../../../../../Components/Buttons/SuccessButton'

export const CompanyDocumentInput = () => {
  const { companyDocuments } = useGetCompanyDocuments()
  const [year, setYear] = useState()

  const yearDocuments = useMemo(
    () => companyDocuments?.find((document) => document.year === year)?.documents,
    [companyDocuments, year]
  )

  return (
    <div className="flex flex-col w-full gap-4">
      <div>
        <CategorySelectGroupTitle>Select Documents</CategorySelectGroupTitle>
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
          <div>
            <SuccessButton>Add</SuccessButton>
          </div>
        </div>
      </div>
      <div>
        <CategorySelectGroupTitle>Documents</CategorySelectGroupTitle>
        <div>No documents selected</div>
      </div>
    </div>
  )
}
