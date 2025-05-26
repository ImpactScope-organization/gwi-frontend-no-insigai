import { useCallback, useMemo, useState } from 'react'
import { useFormikContext } from 'formik'

export const useInputArrayText = ({ name }) => {
  const [value, setValue] = useState('')

  const formik = useFormikContext()

  const formikValues = useMemo(() => formik.values[name] || [], [formik, name])

  const addItem = useCallback(() => {
    if (value.trim() === '') return
    const newValues = [...formikValues, value]
    formik.setFieldValue(name, newValues)
    setValue('')
  }, [formik, formikValues, name, value])

  const removeItem = useCallback(
    (indexToRemove) => {
      const newValues = formikValues.filter((_, index) => index !== indexToRemove)
      formik.setFieldValue(name, newValues)
    },
    [formik, formikValues, name]
  )
  return {
    value,
    setValue,
    formikValues,
    addItem,
    removeItem
  }
}
