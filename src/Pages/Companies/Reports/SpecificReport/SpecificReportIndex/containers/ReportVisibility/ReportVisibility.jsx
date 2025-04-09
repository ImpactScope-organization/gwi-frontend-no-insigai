import React from 'react'
import { ClientVisibility } from './components/ClientVisibility/ClientVisibility'
import { DemoVisibility } from './components/DemoVisibility/DemoVisibility'
import { Divider } from 'antd'

export const ReportVisibility = () => {
  return (
    <div className="card_shadow mt-8  rounded-2xl flex basis-4/12 flex-col z-50 p-[16px]">
      <h2 className="text-[18px] leading-[24px] font-[600]">Visibility</h2>
      <DemoVisibility />
      <Divider className="my-4" />
      <ClientVisibility />
    </div>
  )
}
