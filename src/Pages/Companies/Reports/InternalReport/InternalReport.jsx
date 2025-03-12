import React from 'react'
import { ReportContainer } from '../components/ReportContainer/ReportContainer'
import { ReportList } from '../components/ReportList/ReportList'
import { useGetCompanyInternalReports } from '../../api/CompanyApiQuery'

export const InternalReport = () => {
  const { internalReports } = useGetCompanyInternalReports()

  return (
    <ReportContainer>
      <ReportList data={internalReports} />
    </ReportContainer>
  )
}
