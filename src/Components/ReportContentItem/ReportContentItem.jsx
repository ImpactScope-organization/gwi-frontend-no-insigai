import { CustomReactQuill } from '../CustomReactQuill/CustomReactQuill'
import React from 'react'

export const ReportContentItem = ({ modifyData, onChange, title, isModifying, displayValue }) => {
  return (
    <div
      className={`group ${
        !isModifying ? 'bg-[#F3F5F7]' : 'bg-white border border-1'
      } p-3 rounded-lg mt-[32px] mb-[16px]`}
    >
      <p className="text-reportGrey text-[1em] text-base font-medium mb-2">{title}</p>
      {isModifying && (
        <CustomReactQuill
          value={modifyData}
          onChange={(upcomingValue) => onChange(upcomingValue)}
        />
      )}
      {!isModifying && (
        <div
          className="text-darkBlack mt-[8px] text-[1em] text-base green-links font-medium whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: displayValue }}
        />
      )}
    </div>
  )
}
