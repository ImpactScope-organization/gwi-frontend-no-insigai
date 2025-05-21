import { Input } from 'antd'
import React from 'react'
import { useFormikContext, getIn } from 'formik'

export const SpecificReportInputText = ({ name, label }) => {
  const formik = useFormikContext()
  const value = getIn(formik.values, name)
  const error = getIn(formik.errors, name)
  const touched = getIn(formik.touched, name)

  return (
    <div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
      <h3 className="text-reportGrey text-[1em] text-base font-medium">{label}</h3>
      <Input
        variant="borderless"
        id={name}
        name={name}
        placeholder={label}
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={value}
        status={touched && error ? 'error' : 'success'}
        className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
      />
      <div className="mt-1">
        {touched && error ? <div className="text-[#ff0000]">{error}</div> : null}
      </div>
    </div>
  )
}
