import { useLoading } from '../../Hooks/useLoading'
import { useCallback, useEffect } from 'react'
import { getApi } from '../../utils/api'
import { useQueryParams } from '../../Hooks/useQueryParams'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../Context/AuthContext'

export const useVerifyEmail = () => {
  const { isLoading, startLoading, finishLoading } = useLoading()
  const { queryParams } = useQueryParams()
  const navigate = useNavigate()
  const { login } = useAuthContext()

  const verifyEmail = useCallback(async () => {
    try {
      startLoading()
      const { data } = await (
        await getApi()
      ).put(
        `/api/user/verify-email`,
        {},
        { headers: { Authorization: `Bearer ${queryParams.get('token')}` } }
      )
      toast.success('Email verified successfully. Welcome to GWI!')
      login(data?.result)
      navigate(ROUTES.companies.index)
    } catch (err) {
      toast.error('Invalid or expired token.')
      // todo ask a new token?
      navigate(ROUTES.login)
    } finally {
      finishLoading()
    }
  }, [finishLoading, navigate, queryParams, startLoading])

  useEffect(() => {
    verifyEmail()
  }, [verifyEmail])

  return {
    isLoading
  }
}
