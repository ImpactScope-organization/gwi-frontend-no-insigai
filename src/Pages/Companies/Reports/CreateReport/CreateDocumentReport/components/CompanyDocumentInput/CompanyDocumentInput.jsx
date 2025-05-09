import { useGetCompanyDocuments } from '../../../../../api/CompanyApiQuery'
import { Select } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import { CategorySelectGroupTitle } from '../../../../../../Prompts/components/CategorySelect/components/CategorySelectGroupTitle'
import { SuccessButton } from '../../../../../../../Components/Buttons/SuccessButton'
import { useFormikContext } from 'formik'

export const CompanyDocumentInput = ({ name }) => {
  const formik = useFormikContext()

  const { companyDocuments } = useGetCompanyDocuments()
  const [year, setYear] = useState()
  const [yearDocument, setYearDocument] = useState()

  const yearDocuments = useMemo(
    () => companyDocuments?.find((document) => document.year === year)?.documents,
    [companyDocuments, year]
  )

  const handleAddDocument = useCallback(() => {
    formik.setFieldValue(name, formik.values[name].concat(yearDocument))
    setYearDocument(undefined)
  }, [formik, name, yearDocument])

  return (
    <div className="flex flex-col w-full gap-4">
      <div>
        <CategorySelectGroupTitle>Select Documents</CategorySelectGroupTitle>
        <div className="w-full flex gap-4">
          <Select
            className="w-full"
            onChange={(yearToSet) => {
              setYear(yearToSet)
              setYearDocument(undefined)
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
            onChange={(yearDocumentToSet) => {
              setYearDocument(yearDocumentToSet)
            }}
            value={yearDocument}
          >
            {yearDocuments &&
              yearDocuments.map(({ documentId, title }) => (
                <Select.Option key={documentId} value={documentId}>
                  {title}
                </Select.Option>
              ))}
          </Select>
          <div>
            <SuccessButton onClick={handleAddDocument}>Add</SuccessButton>
          </div>
        </div>
      </div>
      <div>
        <CategorySelectGroupTitle>Documents</CategorySelectGroupTitle>
        {formik.values[name]?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {formik.values[name].map((documentId) => {
              const document = yearDocuments.find((document) => document.documentId === documentId)
              return (
                <div key={documentId} className="flex gap-2">
                  <span>{document.title}</span>
                  <SuccessButton
                    onClick={() => {
                      formik.setFieldValue(
                        name,
                        formik.values[name].filter((id) => id !== documentId)
                      )
                    }}
                  >
                    Remove
                  </SuccessButton>
                </div>
              )
            })}
          </div>
        ) : (
          <div>No documents selected</div>
        )}
      </div>
    </div>
  )
}
