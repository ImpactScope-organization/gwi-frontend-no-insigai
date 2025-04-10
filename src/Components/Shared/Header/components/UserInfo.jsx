import { useState } from 'react'
import { UserOutlined } from '@ant-design/icons'

export const UserInfo = () => {
  const [userDropdownVisible, setUserDropdownVisible] = useState(false)

  return (
    <div className="relative">
      <button type="button" className="text-white cursor-pointer hover:text-darkGreen">
        <UserOutlined />
      </button>
      <div className="absolute -right-4 top-16 bg-white p-4 w-48 text-right rounded-lg shadow-gray-400 shadow-md">
        <a>Logout</a>
      </div>
    </div>
  )
}
