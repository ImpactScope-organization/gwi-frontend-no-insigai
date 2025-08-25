import { Input } from 'antd'
import React, { useCallback, useState } from 'react'
import { useFormikContext } from 'formik'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

export const InputPassword = ({ name, label }) => {
  const formik = useFormikContext()
  const [inputType, setInputType] = useState('password')

  const toggleInputType = useCallback(() => {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'))
  }, [])

  return (
    <div className="w-full">
      <label className="text-md text-darkBlack mb-1 font-semibold block">{label}</label>
      <div className="relative">
        <Input
          name={name}
          placeholder={label}
          type={inputType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          status={formik.touched[name] && formik.errors[name] ? 'error' : 'success'}
        />
        <button className="absolute right-4 top-4" type="button" onClick={toggleInputType}>
          {inputType === 'password' ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </button>
      </div>
      <div className="ml-1">
        {formik.touched[name] && formik.errors[name] ? (
          <div className="text-[#ff0000]">{formik.errors[name]}</div>
        ) : null}
      </div>
    </div>
  )
}
