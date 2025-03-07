import React from 'react'
import { ReportContainer } from '../components/ReportContainer/ReportContainer'
import { ReportList } from '../components/ReportList/ReportList'
import { useGetCompanyInternalReports } from '../../api/CompanyApiQuery'
import { useParams } from 'react-router-dom'

export const InternalReport = () => {
  const { companyId } = useParams()
  const { data } = useGetCompanyInternalReports(companyId)

  return (
    <ReportContainer>
      <ReportList data={data?.results} />
    </ReportContainer>
  )
}
