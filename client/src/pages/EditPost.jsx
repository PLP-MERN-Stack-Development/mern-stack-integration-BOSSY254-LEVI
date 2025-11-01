// client/src/pages/EditPost.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { usePost } from '../hooks/usePost'
import { useUpdatePost } from '../hooks/usePost'
import { useCategories } from '../hooks/useCategories'
import { toast } from 'react-toastify'

export const EditPost = () => {
  const { id } = useParams()
  const { post, loading } = usePost(id)
  const { updatePost, loading: updateLoading } = useUpdatePost()
  const { categories } = useCategories()
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const [featuredImage, setFeaturedImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    if (post) {
      setValue('title', post.title)
      setValue('content', post.content)
      setValue('excerpt', post.excerpt || '')
      setValue('category', post.category._id)
      setValue('tags', post.tags ? post.tags.join(', ') : '')
      setValue('published', post.published.toString())
      
      if (post.featuredImage) {
        setPreviewImage(`http://localhost:5000/${post.featuredImage}`)
      }
    }
  }, [post, setValue])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setFeaturedImage(file)
    
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('content', data.content)
      formData.append('excerpt', data.excerpt)
      formData.append('category', data.category)
      formData.append('tags', data.tags)
      formData.append('published', data.published === 'true')
      
      if (featuredImage) {
        formData.append('featuredImage', featuredImage)
      }
      
      const result = await updatePost(id, formData)
      
      if (result.success) {
        toast.success('Post updated successfully!')
        navigate(`/posts/${id}`)
      } else {
        toast.error(result.message || 'Failed to update post')
      }
    } catch (error) {
      toast.error('An error occurred while updating the post')
      console.error(error)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!post) {
    return <div className="not-found">Post not found</div>
  }

  return (
    <div className="edit-post">
      <h1>Edit Post</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            className="form-control"
            rows="2"
            {...register('excerpt')}
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            className={`form-control ${errors.content ? 'is-invalid' : ''}`}
            rows="10"
            {...register('content', { required: 'Content is required' })}
          ></textarea>
          {errors.content && <div className="invalid-feedback">{errors.content.message}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
            {...register('category', { required: 'Category is required' })}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            className="form-control"
            placeholder="tag1, tag2, tag3"
            {...register('tags')}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="featuredImage">Featured Image</label>
          <input
            type="file"
            id="featuredImage"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
          {previewImage && (
            <div className="image-preview">
              <img src={previewImage} alt="Preview" />
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="published">Publish Status</label>
          <select
            id="published"
            className="form-control"
            {...register('published')}
          >
            <option value="false">Draft</option>
            <option value="true">Published</option>
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={updateLoading}>
          {updateLoading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  )
}