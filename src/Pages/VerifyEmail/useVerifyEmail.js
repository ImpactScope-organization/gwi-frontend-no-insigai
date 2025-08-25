import { useLoading } from '../../Hooks/useLoading'
import { useCallback, useEffect } from 'react'
import { getApi } from '../../utils/api'
import { useQueryParams } from '../../Hooks/useQueryParams'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes'
import { toast } from 'react-toastify'

export const useVerifyEmail = () => {
  const { isLoading, startLoading, finishLoading } = useLoading()
  const { queryParams } = useQueryParams()
  const navigate = useNavigate()

  const verifyEmail = useCallback(async () => {
    try {
      startLoading()
      await (
        await getApi()
      ).put(
        `/api/user/verify-email`,
        {},
        { headers: { Authorization: `Bearer ${queryParams.get('token')}` } }
      )

      toast.success('Email verified successfully. Please login to continue.')
      navigate(ROUTES.login)
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
