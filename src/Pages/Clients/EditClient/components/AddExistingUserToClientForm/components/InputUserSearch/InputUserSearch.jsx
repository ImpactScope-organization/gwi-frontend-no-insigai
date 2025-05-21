import { Select } from 'antd'
import { useInputUserSearch } from './useInputUserSearch'
import { TagWithClose } from '../../../../../../../Components/TagWithClose/TagWithClose'

export const InputUserSearch = ({ name }) => {
  const { handleSearch, transformedSearchResults, handleChange, email, handleClear, value } =
    useInputUserSearch({ name })

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
          <TagWithClose tag={email} onClose={handleClear} />
        ) : (
          <div className="flex w-full">No user selected, search for one :)</div>
        )}
      </div>
    </div>
  )
}
