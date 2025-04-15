import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes'
import { jwtDecode } from 'jwt-decode'
import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from '../utils/auth'

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  accessToken: undefined,
  refreshToken: undefined,
  userInfo: {
    roles: [],
    clientIds: []
  }
})

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLocalStorageFetched, setIsLocalStorageFetched] = useState(false)
  const [accessToken, setAccessToken] = useState(undefined)
  const [refreshToken, setRefreshToken] = useState(undefined)

  const navigate = useNavigate()

  const setTokens = useCallback((accessTokenToSet, refreshTokenToSet) => {
    setAccessToken(accessTokenToSet)
    setRefreshToken(refreshTokenToSet)
  }, [])

  const login = useCallback(
    ({ accessToken: loginAccessToken, refreshToken: loginRefreshToken }) => {
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, loginAccessToken)
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, loginRefreshToken)
      setTokens(loginAccessToken, loginRefreshToken)
      setIsAuthenticated(true)
    },
    [setTokens]
  )

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)
    setTokens(undefined, undefined)
    setIsAuthenticated(false)
  }, [setTokens])

  useEffect(() => {
    const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)
    if (storedAccessToken) {
      setTokens(storedAccessToken, storedRefreshToken)
      setIsAuthenticated(true)
    }
    setIsLocalStorageFetched(true)
  }, [setTokens])

  useEffect(() => {
    if (isLocalStorageFetched && !isAuthenticated) {
      navigate(ROUTES.login)
    }
  }, [isAuthenticated, isLocalStorageFetched, navigate])

  const userInfo = useMemo(() => {
    if (!!accessToken) {
      const { roles, clientIds } = jwtDecode(accessToken)
      return {
        roles,
        clientIds
      }
    }

    return {
      roles: [],
      clientIds: []
    }
  }, [accessToken])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, accessToken, refreshToken, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
