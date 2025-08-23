import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useLoading } from '../../Hooks/useLoading'
import { getApi } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes'

export const useForgotPassword = () => {
  const { isLoading, startLoading, finishLoading } = useLoading()
  const navigate = useNavigate()

  const forgotPasswordFormik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required')
    }),
    onSubmit: async (values) => {
      try {
        startLoading()
        await (await getApi()).post(`/api/password-reset/send`, values)
        toast.success('Password reset instructions sent to your email')
        navigate(ROUTES.login)
      } catch (err) {
        toast.error(err?.response?.data?.message)
      } finally {
        finishLoading()
      }
    }
  })

  return {
    forgotPasswordFormik,
    isLoading
  }
}
