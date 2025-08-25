import { AuthPageContainer } from '../../Components/Page/AuthPageContainer/AuthPageContainer'
import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import { useVerifyEmail } from './useVerifyEmail'
import { Form, FormikProvider } from 'formik'
import { InputText } from '../../Components/Fields/InputText'
import { FilledSuccessButton } from '../../Components/Buttons/FilledSuccessButton'

export const VerifyEmail = () => {
  const { isLoading, isResend, sendVerifyEmailFormik } = useVerifyEmail()

  return (
    <AuthPageContainer subTitle="Verifying your email address">
      {!isResend && (
        <div className="w-full flex justify-center mt-12">
          {isLoading && <LoadingOutlined className="text-4xl" spin />}
        </div>
      )}
      {isResend && (
        <FormikProvider value={sendVerifyEmailFormik}>
          <Form>
            <div className="w-full mt-5 space-y-5">
              <InputText name="email" label="E-mail" />
              <FilledSuccessButton type="submit" isLoading={isLoading}>
                Send email verification
              </FilledSuccessButton>
            </div>
          </Form>
        </FormikProvider>
      )}
    </AuthPageContainer>
  )
}
