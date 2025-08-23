import { useLoading } from '../../Hooks/useLoading'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useQueryParams } from '../../Hooks/useQueryParams'

export const useSetNewPassword = () => {
  const { queryParams } = useQueryParams()

  console.log(queryParams.get('token'))
  const { isLoading, startLoading, finishLoading } = useLoading()

  const setNewPasswordFormik = useFormik({
    initialValues: {
      password: '',
      passwordAgain: ''
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Password is required'),
      passwordAgain: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password is required')
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
    setNewPasswordFormik,
    isLoading
  }
}
