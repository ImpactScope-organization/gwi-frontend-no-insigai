import { ReportContainer } from '../components/ReportContainer/ReportContainer'
import React from 'react'
import { ReportList } from '../components/ReportList/ReportList'
import { useGetCompanyRegulatorReports } from '../../api/CompanyApiQuery'

export const RegulatorReport = () => {
  const { regulatorReports } = useGetCompanyRegulatorReports()

  return (
    <ReportContainer>
      <ReportList data={regulatorReports} />
    </ReportContainer>
  )
}
