// client/src/pages/CreatePost.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useCreatePost } from '../hooks/usePost'
import { useCategories } from '../hooks/useCategories'
import { toast } from 'react-toastify'

export const CreatePost = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [featuredImage, setFeaturedImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const { createPost, loading } = useCreatePost()
  const { categories } = useCategories()
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setFeaturedImage(file)
    
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewImage(null)
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
      
      const result = await createPost(formData)
      
      if (result.success) {
        toast.success('Post created successfully!')
        navigate(`/posts/${result.post._id}`)
      } else {
        toast.error(result.message || 'Failed to create post')
      }
    } catch (error) {
      toast.error('An error occurred while creating the post')
      console.error(error)
    }
  }

  return (
    <div className="create-post">
      <h1>Create New Post</h1>
      
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
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  )
}