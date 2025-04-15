import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes'
import { jwtDecode } from 'jwt-decode'

const AccessContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
})

const ACCESS_TOKEN_STORAGE_KEY = 'accessToken'
const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken'

export const AccessContextProvider = ({ children }) => {
  const [roles, setRoles] = useState([])
  const [availableClientIds, setAvailableClientIds] = useState([])

  const navigate = useNavigate()

  const loadJWTContent = useCallback((accessToken) => {
    const { roles: rolesToSet, clientIds: clientIdsToSet } = jwtDecode(accessToken)
    setRoles(rolesToSet)
    setAvailableClientIds(clientIdsToSet)
  }, [])

  const userRoles = useMemo(() => {
    return {
      isAdmin: roles.includes('admin'),
      isRegulator: roles.includes('regulator'),
      isDemo: roles.includes('demo')
    }
  }, [roles])

  const isClientAvailable = useCallback(
    (clientId) => {
      return availableClientIds.includes(clientId)
    },
    [availableClientIds]
  )

  return (
    <AuthContext.Provider value={{ userRoles, isClientAvailable }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAccessContext = () => useContext(Acc)
