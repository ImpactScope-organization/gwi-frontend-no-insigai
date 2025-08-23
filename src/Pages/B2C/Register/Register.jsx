import RequestLoader from '../../../Components/Shared/RequestLoader'
import { AuthPageContainer } from '../../../Components/Page/AuthPageContainer/AuthPageContainer'
import { useRegister } from './useRegister'
import { InputText } from '../../../Components/Fields/InputText'
import { Form, FormikProvider } from 'formik'
import { InputPassword } from '../../../Components/Fields/InputPassword'
import { SuccessButton } from '../../../Components/Buttons/SuccessButton'

export const Register = () => {
  const { registerFormik, isLoading } = useRegister()

  return (
    <AuthPageContainer>
      <div className="">
        <div className="flex justify-center items-center ">
          <img src="../../assets/__logo.png" alt="logo" className="w-[80px]" />
          <div className="ml-[10px]">
            <h1 className="text-lg font-bold leading-5">
              Greenwashing <br /> Identifier
            </h1>
            <p className="text-sm text-reportGrey ">By ImpactScope</p>
          </div>
        </div>
        <h3 className="text-darkblue mt-8 text-2xl sm:text-3xl md:text-4xl font-[700] text-center leading-[48px]">
          Welcome to GWI Admin
        </h3>

        <h4 className="font-BalsamiqSans text-center text-reportGrey text-lg mt-3 ">
          Sign up and let's get started
        </h4>
      </div>

      <FormikProvider value={registerFormik}>
        <Form>
          <div className="w-full mt-5 space-y-5">
            <InputText name="email" label="E-mail" />
            <InputPassword name="password" label="Password" />
            <InputPassword name="passwordAgain" label="Password Again" />
            <SuccessButton type="submit" isLoading={isLoading}>
              Sign up
            </SuccessButton>
          </div>
        </Form>
      </FormikProvider>
    </AuthPageContainer>
  )
}
