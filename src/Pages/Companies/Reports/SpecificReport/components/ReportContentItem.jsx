import React from 'react'

export const ReportContentItem = ({ title, displayValue }) => {
  return (
    <>
      {title && displayValue && (
        <div className={`group bg-[#F3F5F7] p-3 rounded-lg mt-[32px] mb-[16px]`}>
          <h3 className="text-reportGrey text-[1em] text-base font-medium mb-2">{title}</h3>

          <div
            className="text-darkBlack mt-[8px] text-[1em] text-base green-links font-medium whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: displayValue }}
          />
        </div>
      )}
    </>
  )
}
