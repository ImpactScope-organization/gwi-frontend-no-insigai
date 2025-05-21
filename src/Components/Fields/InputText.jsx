import { Input } from 'antd'
import React from 'react'
import { useFormikContext } from 'formik'

export const InputText = ({ name, label, disabled = false }) => {
  const formik = useFormikContext()
  return (
    <div className="w-full">
      <label className="text-md text-darkBlack mb-1 font-semibold block">{label}</label>
      <Input
        name={name}
        placeholder={label}
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        status={formik.touched[name] && formik.errors[name] ? 'error' : 'success'}
        disabled={disabled}
      />
      <div className="ml-1">
        {formik.touched[name] && formik.errors[name] ? (
          <div className="text-[#ff0000]">{formik.errors[name]}</div>
        ) : null}
      </div>
    </div>
  )
}
