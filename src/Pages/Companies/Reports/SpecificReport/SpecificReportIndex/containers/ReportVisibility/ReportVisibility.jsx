import React from 'react'
import { ClientVisibility } from './components/ClientVisibility/ClientVisibility'

export const ReportVisibility = () => {
  return (
    <div className="card_shadow mt-8  rounded-2xl flex basis-4/12 flex-col z-50 p-[16px]">
      <ClientVisibility />
    </div>
  )
}
