import Switch from 'react-switch'
import React from 'react'
import { useReportVisibility } from './useReportVisibility'

export const ReportVisibility = () => {
  const { handleIsDemoChange, handleRegulatorChange, isDemo, isRegulator } = useReportVisibility()

  return (
    <div className="card_shadow mt-8  rounded-2xl flex basis-4/12 flex-col z-50 p-[16px]">
      <h2 className="text-[18px] leading-[24px] font-[600]">Visibility</h2>
      <div className="flex flex-row flex-nowrap justify-start items-center gap-2  p-2 rounded-2xl">
        <div className="flex flex-row gap-2 w-full justify-between">
          <h2 className="text-[16px] leading-[24px] mt-1 font-[500]">
            <span className="truncate">Demo</span>
          </h2>
          <div>
            <Switch
              height={24}
              onChange={handleIsDemoChange}
              checked={isDemo}
              checkedIcon={false}
              uncheckedIcon={false}
              onColor="#4DC601"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-nowrap justify-start items-center gap-2  p-2 rounded-2xl">
        <div className="flex flex-row gap-2 w-full justify-between">
          <h2 className="text-[16px] leading-[24px] mt-1 font-[500]">
            <span className="truncate">Regulator</span>
          </h2>
          <div>
            <Switch
              height={24}
              onChange={handleRegulatorChange}
              checked={isRegulator}
              checkedIcon={false}
              uncheckedIcon={false}
              onColor="#4DC601"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-nowrap justify-start items-center gap-2  p-2 rounded-2xl">
        <div className="flex flex-row gap-2 w-full justify-between">
          <h2 className="text-[16px] leading-[24px] mt-1 font-[500]">
            <span className="truncate">Specific Client</span>
          </h2>
          <p className="text-darkBlack ml-4 text-[1em] text-base mb-1 font-medium">
            <span className="py-1 px-3 rounded-3xl bg-foggyGrey">coming soon</span>
          </p>
        </div>
      </div>
    </div>
  )
}
