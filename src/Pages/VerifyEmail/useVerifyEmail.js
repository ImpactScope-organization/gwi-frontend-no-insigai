import { useLoading } from '../../Hooks/useLoading'
import { useCallback, useEffect, useState } from 'react'
import { getApi } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../Context/AuthContext'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTokenQueryParameterHeader } from '../../Hooks/useTokenQueryParameterHeader'

export const useVerifyEmail = () => {
  const { isLoading, startLoading, finishLoading } = useLoading()
  const { headers } = useTokenQueryParameterHeader()
  const navigate = useNavigate()
  const { login } = useAuthContext()

  const [isResend, setIsResend] = useState(false)

  const sendVerifyEmailFormik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required')
    }),
    onSubmit: async (values) => {
      try {
        startLoading()
        await (await getApi()).post(`/api/user/send-verification-email`, values)
        toast.success('Email verification email sent. Please check your inbox.')
        navigate(ROUTES.login)
      } catch (err) {
        toast.error(err?.response?.data?.message)
      } finally {
        finishLoading()
      }
    }
  })

  const verifyEmail = useCallback(async () => {
    try {
      startLoading()
      const { data } = await (await getApi()).put(`/api/user/verify-email`, {}, { headers })
      toast.success('Email verified successfully. Welcome to GWI!')
      login(data?.result)
      navigate(ROUTES.companies.index)
    } catch (err) {
      toast.error('Invalid or expired token.')
      setIsResend(true)
    } finally {
      finishLoading()
    }
  }, [finishLoading, headers, login, navigate, startLoading])

  useEffect(() => {
    verifyEmail()
  }, [verifyEmail])

  return {
    isLoading,
    isResend,
    sendVerifyEmailFormik
  }
}
