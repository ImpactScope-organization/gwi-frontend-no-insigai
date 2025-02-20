import { CustomReactQuill } from '../CustomReactQuill/CustomReactQuill'
import React from 'react'

export const EditReportContentItem = ({ modifyData, onChange, title }) => {
  return (
    <div className={`group bg-white border border-1 p-3 rounded-lg mt-[32px] mb-[16px]`}>
      <p className="text-reportGrey text-[1em] text-base font-medium mb-2">{title}</p>

      <CustomReactQuill value={modifyData} onChange={(upcomingValue) => onChange(upcomingValue)} />
    </div>
  )
}
