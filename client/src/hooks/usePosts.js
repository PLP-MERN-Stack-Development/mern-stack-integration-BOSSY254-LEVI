import { useState, useEffect } from 'react'
import { postsAPI } from '../services/api'

export const usePosts = (page = 1, limit = 10, category = null) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [totalPosts, setTotalPosts] = useState(0)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await postsAPI.getPosts(page)
        setPosts(response.data.posts || [])
        setTotalPages(response.data.totalPages || 0)
        setTotalPosts(response.data.totalPosts || 0)
        setError(null)
      } catch (err) {
        setError(err.message || 'Failed to fetch posts')
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [page, limit, category])

  return { posts, loading, error, totalPages, totalPosts }
}
