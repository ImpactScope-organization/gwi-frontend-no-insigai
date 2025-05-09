import { useGetCompanyDocuments } from '../../../../../api/CompanyApiQuery'
import { Select, Tag } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import { CategorySelectGroupTitle } from '../../../../../../Prompts/components/CategorySelect/components/CategorySelectGroupTitle'
import { SuccessButton } from '../../../../../../../Components/Buttons/SuccessButton'
import { useFormikContext } from 'formik'
import { TagWithClose } from '../../../../../../../Components/TagWithClose/TagWithClose'

export const CompanyDocumentInput = ({ name }) => {
  const formik = useFormikContext()

  const { companyDocuments, flattenedCompanyDocuments } = useGetCompanyDocuments()
  const [year, setYear] = useState()
  const [yearDocument, setYearDocument] = useState()

  const yearDocuments = useMemo(
    () => companyDocuments?.find((document) => document.year === year)?.documents,
    [companyDocuments, year]
  )

  const currentCompanyDocuments = useMemo(() => {
    return (
      flattenedCompanyDocuments?.filter((document) =>
        formik.values[name].includes(document.documentId)
      ) || []
    )
  }, [flattenedCompanyDocuments, formik.values, name])

  const handleAddDocument = useCallback(() => {
    formik.setFieldValue(name, formik.values[name].concat(yearDocument))
    setYearDocument(undefined)
  }, [formik, name, yearDocument])

  const handleRemoveDocument = useCallback(
    (documentId) => {
      formik.setFieldValue(
        name,
        formik.values[name].filter((id) => id !== documentId)
      )
    },
    [formik, name]
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
          <div className="flex gap-4 bg-gray-100 p-4 rounded-lg">
            {currentCompanyDocuments.map(({ year, title, documentId }) => {
              return (
                <div>
                  <TagWithClose
                    tag={`${year} - ${title}`}
                    onClose={() => handleRemoveDocument(documentId)}
                  />
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
