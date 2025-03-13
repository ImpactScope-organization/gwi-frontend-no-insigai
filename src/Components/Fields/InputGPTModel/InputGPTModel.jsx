import { Select } from 'antd'
import { useFormikContext } from 'formik'
import { useInputGPTModel } from './useInputGPTModel'

export const InputGPTModel = ({ name, label }) => {
  const formik = useFormikContext()
  const { gptModels } = useInputGPTModel()

  return (
    <div className="w-full">
      <label htmlFor={name} className="text-md text-darkBlack mb-1 font-semibold block">
        {label}
      </label>
      <Select
        className="w-full"
        showSearch
        id={name}
        name={name}
        placeholder={label}
        optionFilterProp="label"
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        status={formik.touched[name] && formik.errors[name] ? 'error' : 'success'}
        options={gptModels}
      />
      <div className="ml-1">
        {formik.touched[name] && formik.errors[name] ? (
          <div className="text-[#ff0000]">{formik.errors[name]}</div>
        ) : null}
      </div>
    </div>
  )
}
