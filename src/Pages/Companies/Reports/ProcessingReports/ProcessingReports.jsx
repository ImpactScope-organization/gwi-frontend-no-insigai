import React from 'react'
import { ReportContainer } from '../components/ReportContainer/ReportContainer'
import { ProcessingReportList } from './ProcessingReportList'
import { useGetCompanyProcessingReports } from '../../api/CompanyApiQuery'
import { useParams } from 'react-router-dom'

export const ProcessingReports = () => {
  const { companyId } = useParams()
  const { data } = useGetCompanyProcessingReports(companyId)

  return (
    <ReportContainer>
      <ProcessingReportList data={data?.results} />
    </ReportContainer>
  )
}
