import { useLoading } from '../../Hooks/useLoading'
import { useAuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { getApi } from '../../utils/api'
import { toast } from 'react-toastify'
import { ROUTES } from '../../routes'
import * as Yup from 'yup'

export const useLogin = () => {
  const { isLoading, startLoading, finishLoading } = useLoading()

  const { login } = useAuthContext()

  const navigate = useNavigate()

  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
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
