import React from 'react'

export const ReportDetailsCard = ({ children, title }) => {
  return (
    <div
      style={{
        boxShadow: '0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)'
      }}
      className="p-[16px] rounded-2xl "
    >
      <h2 className="text-[18px] leading-[24px] font-[600] mb-4">{title}</h2>
      {children}
    </div>
  )
}
