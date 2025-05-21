import React from 'react'
import Switch from 'react-switch'
import { useDemoVisibility } from './useDemoVisibility'

export const DemoVisibility = () => {
  const { handleIsDemoChange, isDemo } = useDemoVisibility()

  return (
    <div>
      <div className="flex flex-row py-2 w-full justify-between">
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
  )
}
