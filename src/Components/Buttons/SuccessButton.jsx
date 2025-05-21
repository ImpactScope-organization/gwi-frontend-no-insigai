import { Button } from 'antd'
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

export const SuccessButton = ({
  onClick,
  icon = undefined,
  isLoading,
  children,
  type = 'button',
  ...props
}) => (
  <Button
    icon={icon}
    onClick={onClick}
    htmlType={type}
    className="w-full flex justify-center items-center text-primary bg-white border-primary hover:!bg-primary hover:!text-white"
    disabled={!!props?.disabled || isLoading}
    {...props}
  >
    {isLoading && <LoadingOutlined spin />}
    {children}
  </Button>
)
