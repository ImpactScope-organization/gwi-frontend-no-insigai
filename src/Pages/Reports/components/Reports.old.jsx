import React from 'react'
import { useStepsContext } from '../../../Context/StateContext'
import SpecificReport from '../SpecificReport'
import SentToRegulators from '../../../Components/Reports/SentToRegulators'

const ReportsOld = () => {
  const { step } = useStepsContext()

  return (
    <div>
      {/* <AllReports /> */}
      {step === 'specific_report' && <SpecificReport />}
      {step === 'sent_to_regulators' && <SentToRegulators />}
    </div>
  )
}

export default ReportsOld
