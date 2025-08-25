import { Form, FormikProvider } from 'formik'
import { useForgotPassword } from './useForgotPassword'
import { AuthPageContainer } from '../../Components/Page/AuthPageContainer/AuthPageContainer'
import { InputText } from '../../Components/Fields/InputText'
import { FilledSuccessButton } from '../../Components/Buttons/FilledSuccessButton'

export const ForgotPassword = () => {
  const { forgotPasswordFormik, isLoading } = useForgotPassword()

  return (
    <AuthPageContainer subTitle="Type your email to reset your password">
      <FormikProvider value={forgotPasswordFormik}>
        <Form>
          <div className="w-full mt-5 space-y-5">
            <InputText name="email" label="E-mail" />
            <FilledSuccessButton type="submit" isLoading={isLoading}>
              Send reset instructions
            </FilledSuccessButton>
          </div>
        </Form>
      </FormikProvider>
    </AuthPageContainer>
  )
}
