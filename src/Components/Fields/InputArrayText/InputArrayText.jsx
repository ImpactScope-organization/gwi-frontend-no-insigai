import { Input } from 'antd'
import React from 'react'
import { useFormikContext } from 'formik'
import { SuccessButton } from '../../Buttons/SuccessButton'
import { TagWithClose } from '../../TagWithClose/TagWithClose'
import { useInputArrayText } from './useInputArrayText'

export const InputArrayText = ({ name, label, disabled = false, placeholder }) => {
  const formik = useFormikContext()

  const { value, setValue, formikValues, addItem, removeItem } = useInputArrayText({ name })

  return (
    <div className="w-full">
      <label className="text-md text-darkBlack mb-1 font-semibold block">{label}</label>
      <div className="relative mb-4">
        <Input
          name={name}
          placeholder={placeholder ? placeholder : 'Add new item'}
          type="text"
          onChange={(e) => setValue(e.target.value)}
          onBlur={formik.handleBlur}
          value={value}
          status={formik.touched[name] && formik.errors[name] ? 'error' : 'success'}
          disabled={disabled}
        />
        <div className="absolute top-0 right-0 w-24">
          <SuccessButton type="button" onClick={addItem}>
            Add
          </SuccessButton>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {formikValues.map((item, index) => (
          <TagWithClose
            key={`input_array_item_${name}_${index}`}
            tag={item}
            onClose={() => removeItem(index)}
          />
        ))}
      </div>
      <div className="ml-1">
        {formik.touched[name] && formik.errors[name] ? (
          <div className="text-[#ff0000]">{formik.errors[name]}</div>
        ) : null}
      </div>
    </div>
  )
}
