import { Button } from 'antd'
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

export const ToggleButton = ({
  onClick,
  icon = undefined,
  isActive = false,
  isLoading,
  children,
  type = 'button',
  ...props
}) => (
  <Button
    icon={icon}
    onClick={onClick}
    htmlType={type}
    className={`w-full flex justify-center items-center  border-primary hover:!bg-primary hover:!text-white ${isActive ? 'bg-primary text-white hover:opacity-90' : 'bg-white text-primary'}`}
    disabled={!!props?.disabled || isLoading}
    {...props}
  >
    {isLoading && <LoadingOutlined spin />}
    {children}
  </Button>
)
