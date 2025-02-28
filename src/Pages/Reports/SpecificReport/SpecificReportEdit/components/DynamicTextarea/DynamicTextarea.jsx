import { CustomReactQuill } from '../../../../../../Components/CustomReactQuill/CustomReactQuill'
import React from 'react'
import { useFormikContext } from 'formik'

export const DynamicTextarea = ({ label, name }) => {
  const formik = useFormikContext()

  return (
    <div className={`group bg-white border border-1 p-3 rounded-lg mt-[32px] mb-[16px]`}>
      <h3 className="text-reportGrey text-[1em] text-base font-medium mb-2">{label}</h3>

      <CustomReactQuill
        id={name}
        name={name}
        placeholder={label}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        status={formik.touched[name] && formik.errors[name] ? 'error' : 'success'}
      />

      <div className="mt-1">
        {formik.touched[name] && formik.errors[name] ? (
          <div className="text-[#ff0000]">{formik.errors[name]}</div>
        ) : null}
      </div>
    </div>
  )
}
