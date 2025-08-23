import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useLoading } from '../../Hooks/useLoading'

export const useForgotPassword = () => {
  const { isLoading, startLoading, finishLoading } = useLoading()

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

        // const { data } = await (await getApi()).post(`/api/auth/login`, values)
        // toast.success('Logged in Successfully')
        // login(data?.result)
        // navigate(ROUTES.companies.index)
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
