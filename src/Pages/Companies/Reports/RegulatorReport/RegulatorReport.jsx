import { ReportContainer } from '../components/ReportContainer/ReportContainer'
import React from 'react'
import { ReportList } from '../components/ReportList/ReportList'
import { useGetCompanyRegulatorReports } from '../../api/CompanyApiQuery'
import { useParams } from 'react-router-dom'

export const RegulatorReport = () => {
  const { companyId } = useParams()
  const { data } = useGetCompanyRegulatorReports(companyId)

  return (
    <ReportContainer>
      <ReportList data={data?.results} />
    </ReportContainer>
  )
}
