// client/src/hooks/useCategories.js
import { useState, useEffect } from 'react'
import { categoriesAPI } from '../services/api'

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await categoriesAPI.getCategories()
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading }
}