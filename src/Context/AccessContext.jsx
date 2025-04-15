import React, { createContext, useContext, useCallback, useMemo } from 'react'
import { useAuthContext } from './AuthContext'

const AccessContext = createContext({
  userRoles: {
    isAdmin: false,
    isRegulator: false,
    isDemo: false
  },
  isClientAvailable: () => {}
})

export const AccessContextProvider = ({ children }) => {
  const {
    userInfo: { roles, clientIds }
  } = useAuthContext()

  const userRoles = useMemo(() => {
    return {
      isAdmin: roles.includes('admin'),
      isRegulator: roles.includes('regulator'),
      isDemo: roles.includes('demo')
    }
  }, [roles])

  const isClientAvailable = useCallback(
    (clientId) => {
      return clientIds.includes(clientId)
    },
    [clientIds]
  )

  return (
    <AccessContext.Provider value={{ userRoles, isClientAvailable }}>
      {children}
    </AccessContext.Provider>
  )
}

export const useAccessContext = () => useContext(AccessContext)
