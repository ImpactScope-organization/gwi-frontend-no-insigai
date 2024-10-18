import React, { createContext, useState, useEffect, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes'

const AuthContext = createContext({
  isAuthenticated: false,
  login: (userToken) => {},
  logout: () => {}
})

const USER_TOKEN_STORAGE_KEY = 'userInfo'

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLocalStorageFetched, setIsLocalStorageFetched] = useState(false)
  const navigate = useNavigate()

  const login = useCallback((userToken) => {
    localStorage.setItem(USER_TOKEN_STORAGE_KEY, userToken)
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(USER_TOKEN_STORAGE_KEY)
    setIsAuthenticated(false)
  }, [])

  useEffect(() => {
    const userInfo = localStorage.getItem(USER_TOKEN_STORAGE_KEY)
    if (userInfo) {
      setIsAuthenticated(true)
    }
    setIsLocalStorageFetched(true)
  }, [])

  useEffect(() => {
    if (isLocalStorageFetched) {
      if (!isAuthenticated) {
        navigate(ROUTES.login)
      } else {
        navigate(ROUTES.home)
      }
    }
  }, [isAuthenticated, isLocalStorageFetched])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
