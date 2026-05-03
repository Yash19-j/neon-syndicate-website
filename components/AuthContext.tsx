'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface AuthContextValue {
  isOpen: boolean
  defaultTab: 'signin' | 'signup'
  openAuth: (tab?: 'signin' | 'signup') => void
  closeAuth: () => void
}

const AuthContext = createContext<AuthContextValue>({
  isOpen: false,
  defaultTab: 'signup',
  openAuth: () => {},
  closeAuth: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [defaultTab, setDefaultTab] = useState<'signin' | 'signup'>('signup')

  const openAuth = useCallback((tab: 'signin' | 'signup' = 'signup') => {
    setDefaultTab(tab)
    setIsOpen(true)
  }, [])

  const closeAuth = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <AuthContext.Provider value={{ isOpen, defaultTab, openAuth, closeAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
