import React, { createContext, useState, useEffect, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes'

const AuthContext = createContext({
  isAuthenticated: false,
  login: (userToken) => {},
  logout: () => {}
})

const USER_TOKEN_STORAGE_KEY = 'userInfo'
const ACCESS_TOKEN_STORAGE_KEY = 'accessToken'
const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken'

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLocalStorageFetched, setIsLocalStorageFetched] = useState(false)
  const navigate = useNavigate()

  const login = useCallback(({ accessToken, refreshToken }) => {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken)
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken)
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)
    setIsAuthenticated(false)
  }, [])

  useEffect(() => {
    const userInfo = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
    if (userInfo) {
      setIsAuthenticated(true)
    }
    setIsLocalStorageFetched(true)
  }, [])

  useEffect(() => {
    if (isLocalStorageFetched && !isAuthenticated) {
      navigate(ROUTES.login)
    }
  }, [isAuthenticated, isLocalStorageFetched, navigate])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
