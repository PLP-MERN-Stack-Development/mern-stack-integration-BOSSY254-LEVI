// client/src/components/CommentForm.jsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export const CommentForm = ({ postId, onCommentSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const result = await onCommentSubmit(data)
      
      if (result.success) {
        toast.success('Comment added successfully!')
        reset()
      } else {
        toast.error(result.message || 'Failed to add comment')
      }
    } catch (error) {
      toast.error('An error occurred while adding your comment')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="comment-form">
      <h3>Add a Comment</h3>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <textarea
            className={`form-control ${errors.content ? 'is-invalid' : ''}`}
            rows="4"
            placeholder="Write your comment here..."
            {...register('content', { required: 'Comment content is required' })}
          ></textarea>
          {errors.content && <div className="invalid-feedback">{errors.content.message}</div>}
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
    </div>
  )
}