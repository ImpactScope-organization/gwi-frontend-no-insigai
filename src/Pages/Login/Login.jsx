import { useFormik } from 'formik'
import { loginModalScehma } from '../../validation-schema'
import { toast } from 'react-toastify'
import RequestLoader from '../../Components/Shared/RequestLoader'
import { useAuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes'
import { useState } from 'react'
import { getApi } from '../../utils/api'
import { AuthPageContainer } from '../../Components/Page/AuthPageContainer/AuthPageContainer'

export const Login = () => {
  const [requestLoading, setRequestLoading] = useState(false)

  const { login } = useAuthContext()

  const navigate = useNavigate()

  const initialValues = {
    email: '',
    password: ''
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginModalScehma,

    onSubmit: async (values) => {
      try {
        setRequestLoading(true)

        await (await getApi()).post(`/api/auth/login`, values).then(({ data }) => {
          setRequestLoading(false)
          toast.success('Logged in Successfully')

          login(data?.result)
          navigate(ROUTES.companies.index)
        })
      } catch (err) {
        toast.error(err?.response?.data?.message)
        setRequestLoading(false)
      }
    }
  })

  return (
    <AuthPageContainer>
      <div className="">
        <div className="flex justify-center items-center ">
          <img src="./assets/__logo.png" alt="logo" className="w-[80px]" />
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
          Sign in to get started
        </h4>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-5 space-y-3">
        <input
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
          className="p-4 bg-[#f5f4f4] rounded-lg border-none focus:outline-none w-full"
        />

        {errors.email && touched.email ? (
          <p className="text-sm text-[#ff0000]">{errors.email}</p>
        ) : null}

        <input
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Password"
          className="p-4 bg-[#f5f4f4] border-none rounded-lg focus:outline-none w-full"
        />
        {errors.password && touched.password ? (
          <p className="text-sm  text-[#ff0000]">{errors.password}</p>
        ) : null}

        <div className="!mt-10">
          <button
            type="submit"
            className="bg-primary cursor-pointer w-full relative h-[64px]  text-white text-center  rounded-md  py-3 text-lg font-medium"
          >
            {requestLoading ? <RequestLoader /> : 'Sign in'}
          </button>
        </div>
      </form>
    </AuthPageContainer>
  )
}
