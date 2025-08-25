import { AuthPageContainer } from '../../Components/Page/AuthPageContainer/AuthPageContainer'
import { useLogin } from './useLogin'
import { Form, FormikProvider } from 'formik'
import { InputText } from '../../Components/Fields/InputText'
import { InputPassword } from '../../Components/Fields/InputPassword'
import { FilledSuccessButton } from '../../Components/Buttons/FilledSuccessButton'
import { ROUTES } from '../../routes'
import { Link } from 'react-router-dom'

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
                <Link className="text-primary underline" to={ROUTES.forgotPassword}>
                  Forgot password?
                </Link>
              </div>
              <div>
                New to GWI?{' '}
                <Link className="text-primary underline" to={ROUTES.b2c.register}>
                  Register
                </Link>
              </div>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </AuthPageContainer>
  )
}
