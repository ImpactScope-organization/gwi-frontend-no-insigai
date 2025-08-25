import { AuthPageContainer } from '../../Components/Page/AuthPageContainer/AuthPageContainer'
import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import { useVerifyEmail } from './useVerifyEmail'

export const VerifyEmail = () => {
  const { isLoading } = useVerifyEmail()

  return (
    <AuthPageContainer subTitle="Verifying your email address">
      <div className="w-full flex justify-center mt-12">
        {isLoading && <LoadingOutlined className="text-4xl" spin />}
      </div>
    </AuthPageContainer>
  )
}
