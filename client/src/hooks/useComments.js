// client/src/hooks/useComments.js
import { useState, useEffect } from 'react'
import { commentsAPI } from '../services/api'

export const useComments = (postId) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true)
        const response = await commentsAPI.getComments(postId)
        setComments(response.data)
      } catch (error) {
        console.error('Error fetching comments:', error)
      } finally {
        setLoading(false)
      }
    }

    if (postId) {
      fetchComments()
    }
  }, [postId])

  const addComment = async (commentData) => {
    try {
      const response = await commentsAPI.addComment(postId, commentData)
      setComments(prevComments => [response.data, ...prevComments])
      return { success: true, comment: response.data }
    } catch (error) {
      console.error('Error adding comment:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add comment' 
      }
    }
  }

  return { comments, loading, addComment }
}