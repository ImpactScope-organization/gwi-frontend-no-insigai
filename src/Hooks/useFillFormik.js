import { useCallback, useEffect, useRef, useState } from 'react'

export const useFillFormik = (formik, query) => {
  const [isFormikFilled, setIsFormikFilled] = useState(false)

  const formikRef = useRef(formik)

  const fillFormik = useCallback(async () => {
    if (query && !isFormikFilled) {
      await formikRef.current.setValues(query)

      setTimeout(async () => {
        await formikRef.current.validateForm()
        await formikRef.current.setTouched(
          Object.keys(formikRef.current.values).reduce((acc, key) => {
            acc[key] = true
            return acc
          }, {})
        )
        setIsFormikFilled(true)
      }, 100)
    }
  }, [isFormikFilled, query])

  useEffect(() => {
    fillFormik()
  }, [fillFormik, formikRef, isFormikFilled, query])

  const resetFormikFilled = useCallback(() => {
    setIsFormikFilled(false)
  }, [])

  return {
    resetFormikFilled,
    isFormikFilled
  }
}
