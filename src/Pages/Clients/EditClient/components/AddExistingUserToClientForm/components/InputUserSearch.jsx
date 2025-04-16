import { Select } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import { searchUsersByEmail } from '../../../../api/UserApi/UserApi'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useFormikContext } from 'formik'

export const InputUserSearch = ({ name }) => {
  const formik = useFormikContext()

  const [searchResults, setSearchResults] = useState([])
  const [value, setValue] = useState()
  const [email, setEmail] = useState()

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
      setValue(newValue)
      setEmail(searchResults.find((user) => user.id === newValue)?.email)
      formik.setFieldValue(name, newValue)
    },
    [formik, name, searchResults]
  )

  const handleClear = useCallback(() => {
    setValue(null)
    setEmail(null)
  }, [])

  return (
    <div className="flex flex-row w-full gap-4">
      <div className="w-full flex flex-col gap-4">
        <label className="font-bold">Search for user by email</label>
        <Select
          className="w-full"
          showSearch
          value={value}
          placeholder="Search for email"
          defaultActiveFirstOption={false}
          suffixIcon={null}
          filterOption={false}
          onSearch={handleSearch}
          onChange={handleChange}
          notFoundContent={null}
          options={transformedSearchResults || []}
        />
      </div>
      <div className="w-full flex flex-col gap-4">
        <label className="font-bold">Selected user</label>
        {value ? (
          <div className="w-full flex items-center justify-center bg-darkGreen text-white rounded-md p-4 relative">
            <span>{email}</span>
            <button
              className="absolute -right-2 -top-2 text-red-400 bg-white text-xl leading-4 w-6 h-6 rounded-full hover:text-red-600"
              onClick={handleClear}
            >
              <CloseCircleOutlined />
            </button>
          </div>
        ) : (
          <div className="flex w-full">No user selected, search for one :)</div>
        )}
      </div>
    </div>
  )
}
