import { useLoading } from '../../Hooks/useLoading'
import { useAuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { loginModalScehma } from '../../validation-schema'
import { getApi } from '../../utils/api'
import { toast } from 'react-toastify'
import { ROUTES } from '../../routes'

export const useLogin = () => {
  const { isLoading, startLoading, finishLoading } = useLoading()

  const { login } = useAuthContext()

  const navigate = useNavigate()

  const initialValues = {
    email: '',
    password: ''
  }

  const loginFormik = useFormik({
    initialValues,
    validationSchema: loginModalScehma,

    onSubmit: async (values) => {
      try {
        startLoading()

        const { data } = await (await getApi()).post(`/api/auth/login`, values)
        toast.success('Logged in Successfully')
        login(data?.result)
        navigate(ROUTES.companies.index)
      } catch (err) {
        toast.error(err?.response?.data?.message)
      } finally {
        finishLoading()
      }
    }
  })

  return {
    loginFormik,
    isLoading
  }
}
