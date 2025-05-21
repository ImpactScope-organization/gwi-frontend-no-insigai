import React from 'react'
import { useCurrentCompanyReport } from '../../hooks/useCurrentCompanyReport'
import { ReportDetailsCard } from '../ReportDetailsCard/ReportDetailsCard'
import { ReportDocumentItem } from './components/ReportDocumentItem'

export const ReportDocuments = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()

  return (
    <ReportDetailsCard title="Documents">
      <div className="flex gap-2 flex-col">
        {currentCompanyReport?.documents?.map((document) => (
          <ReportDocumentItem key={document._id} name={document.name} s3Path={document.s3Path} />
        ))}
        {currentCompanyReport?.documents?.length === 0 && currentCompanyReport?.fileName && (
          <ReportDocumentItem name={currentCompanyReport?.fileName} />
        )}
      </div>
    </ReportDetailsCard>
  )
}
