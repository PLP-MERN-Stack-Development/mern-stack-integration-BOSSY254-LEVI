// client/src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // You could add a verify token endpoint to validate the token
      setIsAuthenticated(true)
      // Optionally fetch user data
    }
    setLoading(false)
  }, [])

  const login = async (formData) => {
    try {
      const response = await authAPI.login(formData.email, formData.password)
      const { token } = response.data

      localStorage.setItem('token', token)
      setIsAuthenticated(true)

      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  const register = async (formData) => {
    try {
      const response = await authAPI.register(formData.name, formData.email, formData.password)
      const { token } = response.data

      localStorage.setItem('token', token)
      setIsAuthenticated(true)

      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUser(null)
    toast.info('You have been logged out')
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      loading,
      user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}