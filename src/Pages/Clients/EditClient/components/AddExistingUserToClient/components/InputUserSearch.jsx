import { Select } from 'antd'
import { useState } from 'react'
import { searchUsersByEmail } from '../../../../api/UserApi/UserApi'
import { CloseCircleOutlined } from '@ant-design/icons'

export const InputUserSearch = () => {
  const [searchResults, setSearchResults] = useState([])
  const [value, setValue] = useState()

  const handleSearch = async (email) => {
    if (email?.length > 2) {
      const { result } = await searchUsersByEmail(email)
      const searchResultList = result.map((user) => ({
        value: user.email,
        label: user.email
      }))
      setSearchResults(searchResultList)
    }
  }

  const handleChange = (newValue) => {
    setValue(newValue)
  }

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
          options={searchResults || []}
        />
      </div>
      <div className="w-full flex flex-col gap-4">
        <label className="font-bold">Selected user</label>
        {value ? (
          <div className="w-full flex items-center justify-center bg-darkGreen text-white rounded-md p-4 relative">
            <span>{value}</span>
            <button
              className="absolute -right-2 -top-2 text-red-400 bg-white text-xl leading-4 w-6 h-6 rounded-full hover:text-red-600"
              onClick={() => setValue(null)}
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
