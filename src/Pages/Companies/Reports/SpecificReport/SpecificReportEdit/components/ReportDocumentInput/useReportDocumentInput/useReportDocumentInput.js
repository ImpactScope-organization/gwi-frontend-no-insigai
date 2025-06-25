import { useFormikContext } from 'formik'
import { useGetCompanyDocuments } from '../../../../../../api/CompanyApiQuery'
import { useCallback, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

export const useReportDocumentInput = ({ name }) => {
  const formik = useFormikContext()

  const { companyDocuments } = useGetCompanyDocuments()
  const [year, setYear] = useState()
  const [yearDocument, setYearDocument] = useState()

  const flattenedCompanyDocuments = useMemo(() => {
    return companyDocuments?.reduce((acc, { documents }) => acc.concat(documents), [])
  }, [companyDocuments])

  const yearDocuments = useMemo(() => {
    return (
      companyDocuments
        ?.find((document) => document.year === year)
        ?.documents?.sort((a, b) => a.reportType.localeCompare(b.reportType)) || []
    )
  }, [companyDocuments, year])

  const currentCompanyDocuments = useMemo(() => {
    return (
      flattenedCompanyDocuments?.filter((document) =>
        formik.values[name].map(({ documentId }) => documentId).includes(document.documentId)
      ) || []
    )
  }, [flattenedCompanyDocuments, formik.values, name])

  const handleAddDocument = useCallback(() => {
    if (formik.values[name].some(({ documentId }) => documentId === yearDocument)) {
      toast.error('Document already added')
      return
    }

    const documentBase = flattenedCompanyDocuments.find(
      ({ documentId }) => documentId === yearDocument
    )
    const documentToAdd = {
      documentId: documentBase.documentId,
      name: `${documentBase.year}_${documentBase.reportType}.xlsx`,
      s3Path: documentBase.files.find((item) => item.type === 'scoresFile')?.s3Path,
      type: 'reportDocument'
    }

    formik.setFieldValue(name, formik.values[name].concat(documentToAdd))
    setYearDocument(undefined)
  }, [flattenedCompanyDocuments, formik, name, yearDocument])

  const handleRemoveDocument = useCallback(
    (documentId) => {
      formik.setFieldValue(
        name,
        formik.values[name].filter((item) => item.documentId !== documentId)
      )
    },
    [formik, name]
  )

  const hasDocuments = useMemo(() => formik.values[name]?.length > 0, [formik.values, name])

  return {
    flattenedCompanyDocuments,
    hasDocuments,
    companyDocuments,
    yearDocuments,
    yearDocument,
    currentCompanyDocuments,
    setYear,
    setYearDocument,
    handleAddDocument,
    handleRemoveDocument
  }
}
