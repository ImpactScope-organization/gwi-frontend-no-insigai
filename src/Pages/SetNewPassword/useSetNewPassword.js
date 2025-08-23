import { useLoading } from '../../Hooks/useLoading'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useQueryParams } from '../../Hooks/useQueryParams'
import { getApi } from '../../utils/api'
import { ROUTES } from '../../routes'
import { useNavigate } from 'react-router-dom'

export const useSetNewPassword = () => {
  const { queryParams } = useQueryParams()
  const navigate = useNavigate()

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

        await (
          await getApi()
        ).put(`/api/password-reset/set`, values, {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${queryParams.get('token')}`
          }
        })
        toast.success('Password set successfully. You can now log in.')
        navigate(ROUTES.login)
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
