import RequestLoader from '../../Components/Shared/RequestLoader'
import { AuthPageContainer } from '../../Components/Page/AuthPageContainer/AuthPageContainer'
import { useLogin } from './useLogin'
import { Form, FormikProvider } from 'formik'
import { InputText } from '../../Components/Fields/InputText'
import { InputPassword } from '../../Components/Fields/InputPassword'
import { FilledSuccessButton } from '../../Components/Buttons/FilledSuccessButton'
import { ButtonLink } from '../../Components/ButtonLink/ButtonLink'
import { ROUTES } from '../../routes'

export const Login = () => {
  const { loginFormik, isLoading } = useLogin()

  return (
    <AuthPageContainer subTitle="Sign in to get started">
      <FormikProvider value={loginFormik}>
        <Form>
          <div className="w-full mt-5 space-y-5">
            <InputText name="email" label="E-mail" />
            <InputPassword name="password" label="Password" />
            <FilledSuccessButton type="submit" isLoading={isLoading}>
              Sign in
            </FilledSuccessButton>
            <div className="flex items-center flex-col gap-5">
              <div>
                <a className="text-primary underline" href={ROUTES.b2c.register}>
                  Forgot password?
                </a>
              </div>
              <div>
                New to GWI?{' '}
                <a className="text-primary underline" href={ROUTES.b2c.register}>
                  Register
                </a>
              </div>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </AuthPageContainer>
  )
}
