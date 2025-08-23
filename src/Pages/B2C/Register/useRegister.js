import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useLoading } from '../../../Hooks/useLoading'

export const useRegister = () => {
  const { isLoading, startLoading, finishLoading } = useLoading()

  const registerFormik = useFormik({
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
    registerFormik,
    isLoading
  }
}
