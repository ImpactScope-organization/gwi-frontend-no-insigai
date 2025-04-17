import { useFormikContext } from 'formik'
import { useCallback, useMemo, useState } from 'react'
import { searchUsersByEmail } from '../../../../../api/UserApi/UserApi'

export const useInputUserSearch = ({ name }) => {
  const formik = useFormikContext()

  const [searchResults, setSearchResults] = useState([])

  const handleSearch = useCallback(async (email) => {
    if (email?.length > 2) {
      const { result } = await searchUsersByEmail(email)
      setSearchResults(result)
    }
  }, [])

  const transformedSearchResults = useMemo(
    () =>
      searchResults.map((user) => ({
        value: user.id,
        label: user.email
      })),
    [searchResults]
  )

  const handleChange = useCallback(
    (newValue) => {
      formik.setFieldValue(name, newValue)
    },
    [formik, name]
  )

  const email = useMemo(() => {
    return searchResults.find((user) => user.id === formik.values[name])?.email
  }, [formik.values, name, searchResults])

  const handleClear = useCallback(() => {
    formik.setFieldValue(name, null)
  }, [formik, name])

  const value = formik.values[name]

  return {
    handleSearch,
    transformedSearchResults,
    handleChange,
    email,
    handleClear,
    value
  }
}
