import React from 'react'
import { useStepsContext } from '../../../Context/StateContext'
import SpecificReport from '../SpecificReport'

const ReportsOld = () => {
  const { step } = useStepsContext()

  return (
    <div>
      {/* <AllReports /> */}
      {step === 'specific_report' && <SpecificReport />}
    </div>
  )
}

export default ReportsOld
