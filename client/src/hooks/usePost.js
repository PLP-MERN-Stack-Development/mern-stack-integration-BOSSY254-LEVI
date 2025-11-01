// client/src/hooks/usePosts.js
import { useState, useEffect } from 'react'
import { postsAPI } from '../services/api'

export const usePosts = (page = 1) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [totalPosts, setTotalPosts] = useState(0)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await postsAPI.getPosts(page)
        setPosts(response.data.posts)
        setTotalPages(response.data.totalPages)
        setTotalPosts(response.data.totalPosts)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [page])

  return { posts, loading, totalPages, totalPosts }
}

export const usePost = (id) => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const response = await postsAPI.getPost(id)
        setPost(response.data)
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  return { post, loading }
}

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false)

  const createPost = async (postData) => {
    try {
      setLoading(true)
      const response = await postsAPI.createPost(postData)
      return { success: true, post: response.data }
    } catch (error) {
      console.error('Error creating post:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to create post' 
      }
    } finally {
      setLoading(false)
    }
  }

  return { createPost, loading }
}

export const useUpdatePost = () => {
  const [loading, setLoading] = useState(false)

  const updatePost = async (id, postData) => {
    try {
      setLoading(true)
      const response = await postsAPI.updatePost(id, postData)
      return { success: true, post: response.data }
    } catch (error) {
      console.error('Error updating post:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update post' 
      }
    } finally {
      setLoading(false)
    }
  }

  return { updatePost, loading }
}

export const useSearchPosts = (query, category, page = 1) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [totalPosts, setTotalPosts] = useState(0)

  useEffect(() => {
    const searchPosts = async () => {
      try {
        setLoading(true)
        const response = await postsAPI.searchPosts(query, category, page)
        setPosts(response.data.posts)
        setTotalPages(response.data.totalPages)
        setTotalPosts(response.data.totalPosts)
      } catch (error) {
        console.error('Error searching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    searchPosts()
  }, [query, category, page])

  return { posts, loading, totalPages, totalPosts }
}