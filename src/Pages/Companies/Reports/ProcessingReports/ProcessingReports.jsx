import React from 'react'
import { ReportContainer } from '../components/ReportContainer/ReportContainer'
import { ProcessingReportList } from './ProcessingReportList'
import { useGetCompanyProcessingReports } from '../../api/CompanyApiQuery'

export const ProcessingReports = () => {
  const { processingReports } = useGetCompanyProcessingReports()

  return (
    <ReportContainer>
      <ProcessingReportList data={processingReports} />
    </ReportContainer>
  )
}
