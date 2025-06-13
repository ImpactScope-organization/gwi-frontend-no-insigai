import { Input } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { getIn, useFormikContext } from 'formik'

export const SpecificReportInputPercentage = ({ name, label }) => {
  const formik = useFormikContext()
  const value = getIn(formik.values, name)
  const error = getIn(formik.errors, name)
  const touched = getIn(formik.touched, name)

  const [initialized, setInitialized] = useState(false)
  const [percentageValue, setPercentageValue] = useState(0)

  useEffect(() => {
    if (!initialized) {
      setPercentageValue(value * 100)
      setInitialized(true)
    }
  }, [initialized, value])

  const handlePercentageChange = useCallback(
    async (e) => {
      const valueToSet = e.target.value
      setPercentageValue(valueToSet)
      await formik.setFieldTouched(name, true)
      await formik.setFieldValue(name, valueToSet / 100)
      await formik.validateField(name)
    },
    [formik, name]
  )

  return (
    <div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
      <h3 className="text-reportGrey text-[1em] text-base font-medium">{label}</h3>
      <div className="flex items-center gap-1 mt-[8px]">
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
          className="hidden"
        />
        <Input
          variant="borderless"
          placeholder={label}
          type="text"
          onChange={handlePercentageChange}
          onBlur={handlePercentageChange}
          value={percentageValue}
          status={touched && error ? 'error' : 'success'}
          className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
        />
        <div className="text-reportGrey">%</div>
      </div>
      <div className="mt-1">
        {touched && error ? <div className="text-[#ff0000]">{error}</div> : null}
      </div>
    </div>
  )
}
