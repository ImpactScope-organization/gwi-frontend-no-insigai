import React from 'react'

export const ReportingRiskItem = ({ title, children }) => (
  <div className="grid grid-cols-2">
    <p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">{title}</p>
    <p className="text-darkBlack  text-[1em] text-base mb-1 font-medium">{children}</p>
  </div>
)
