import { Select } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useFormikContext } from 'formik'
import { useInputUserSearch } from './useInputUserSearch'

export const InputUserSearch = ({ name }) => {
  const formik = useFormikContext()
  const { handleSearch, transformedSearchResults, handleChange, email, handleClear } =
    useInputUserSearch({ name })

  return (
    <div className="flex flex-row w-full gap-4">
      <div className="w-full flex flex-col gap-4">
        <label className="font-bold">Search for user by email</label>
        <Select
          className="w-full"
          showSearch
          value={formik.values[name]}
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
        {formik.values[name] ? (
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
