import React from 'react'
import Switch from 'react-switch'

export const ToggleWithLabel = ({ label, checked, onChange, disabled = false }) => {
  return (
    <div className="flex flex-row w-full justify-between">
      <span className="text-[16px] leading-[24px] font-[500]">{label}</span>
      <Switch
        height={24}
        onChange={onChange}
        checked={checked}
        checkedIcon={false}
        disabled={disabled}
        uncheckedIcon={false}
        onColor="#4DC601"
      />
    </div>
  )
}
