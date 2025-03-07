import { ReportContainer } from '../components/ReportContainer/ReportContainer'
import React from 'react'
import { useGetAllReportsSentToRegulators } from '../../../../Hooks/reports-hooks'
import { ReportList } from '../components/ReportList/ReportList'

export const RegulatorReport = () => {
  const { data } = useGetAllReportsSentToRegulators()

  return (
    <ReportContainer>
      <ReportList data={data} />
    </ReportContainer>
  )
}
