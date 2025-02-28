import ReactQuill from 'react-quill-new'
import React from 'react'
import { useFormikContext } from 'formik'

export const CustomReactQuillFormik = ({ name, placeholder }) => {
  const formik = useFormikContext()
  return (
    <ReactQuill
      theme="snow"
      formats={['link']}
      modules={{
        toolbar: ['link']
      }}
      id={name}
      name={name}
      value={formik.values[name]}
      placeholder={placeholder}
      onChange={(value) => {
        formik.setFieldValue(name, value)
      }}
    />
  )
}
