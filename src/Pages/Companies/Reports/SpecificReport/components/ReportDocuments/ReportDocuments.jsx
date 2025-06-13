import React, { useMemo } from 'react'
import { useCurrentCompanyReport } from '../../hooks/useCurrentCompanyReport'
import { ReportDetailsCard } from '../ReportDetailsCard/ReportDetailsCard'
import { ReportDocumentItem } from './components/ReportDocumentItem'
import { useAccessContext } from '../../../../../../Context/AccessContext'

export const ReportDocuments = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()
  const {
    userRoles: { isAdmin, isRegulator }
  } = useAccessContext()

  const regulatorDocuments = useMemo(
    () => currentCompanyReport?.documents?.filter((document) => document.type !== 'merge'),
    [currentCompanyReport?.documents]
  )

  return (
    <ReportDetailsCard title="Documents">
      <div className="flex gap-2 flex-col">
        {isAdmin &&
          currentCompanyReport?.documents?.map((document) => (
            <ReportDocumentItem key={document._id} name={document.name} s3Path={document.s3Path} />
          ))}
        {isRegulator &&
          regulatorDocuments?.map((document) => (
            <ReportDocumentItem key={document._id} name={document.name} />
          ))}
        {currentCompanyReport?.documents?.length === 0 && currentCompanyReport?.fileName && (
          <ReportDocumentItem name={currentCompanyReport?.fileName} />
        )}
      </div>
    </ReportDetailsCard>
  )
}
