import React from 'react'
import Switch from 'react-switch'

export const ClientVisibility = () => {
  return (
    <div className="flex-col">
      <h2 className="text-[18px] leading-[24px] font-[600]">Specific clients</h2>
      <div className="flex flex-row gap-2 w-full justify-between">
        <div className="flex flex-row gap-2 w-full justify-between">
          <h2 className="text-[16px] leading-[24px] mt-1 font-[500]">
            <span className="truncate">Demo</span>
          </h2>
          <div>
            <Switch
              height={24}
              onChange={() => {}}
              checked={false}
              checkedIcon={false}
              uncheckedIcon={false}
              onColor="#4DC601"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
