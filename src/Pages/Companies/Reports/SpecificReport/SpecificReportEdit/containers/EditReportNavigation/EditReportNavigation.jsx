import React from 'react'

export const EditReportNavigation = () => {
  return (
    <div className="flex flex-row justify-center gap-2 col-span-2 w-full">
      <button className="bg-primary rounded-lg py-[12px] flex w-full text-center justify-center px-[4px] col-span-1 border-none outline-none text-[#fff] text-[16px] font-[600] leading-[24px]">
        Update Report
      </button>
      <button className="bg-white border border-darkBlack rounded-lg w-full text-center justify-center flex py-[12px] col-span-1 px-[4px] text-darkBlack text-[16px] font-[600] leading-[24px]">
        Cancel
      </button>
    </div>
  )
}
