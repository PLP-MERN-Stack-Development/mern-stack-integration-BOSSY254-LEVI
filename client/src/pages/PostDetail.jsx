// client/src/pages/PostDetail.jsx
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { usePost } from '../hooks/usePost'
import { useComments } from '../hooks/useComments'
import { CommentForm } from '../components/CommentForm'
import { CommentList } from '../components/CommentList'
import { Loading } from '../components/Loading'
import { useAuth } from '../context/AuthContext'

export const PostDetail = () => {
  const { id } = useParams()
  const { post, loading } = usePost(id)
  const { comments, addComment } = useComments(id)
  const { isAuthenticated } = useAuth()

  if (loading) {
    return <Loading />
  }

  if (!post) {
    return <div className="not-found">Post not found</div>
  }

  return (
    <div className="post-detail">
      <h1 className="post-title">{post.title}</h1>
      
      <div className="post-meta">
        <span>By {post.author.username}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="post-category">{post.category.name}</span>
      </div>
      
      {post.featuredImage && (
        <img 
          src={`http://localhost:5000/${post.featuredImage}`} 
          alt={post.title} 
          className="post-image"
        />
      )}
      
      <div className="post-content">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      
      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          <h3>Tags:</h3>
          <div className="tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      )}
      
      <div className="comments-section">
        <h2>Comments ({comments.length})</h2>
        
        {isAuthenticated ? (
          <CommentForm postId={id} onCommentSubmit={addComment} />
        ) : (
          <p>
            <Link to="/login">Login</Link> to add a comment
          </p>
        )}
        
        <CommentList comments={comments} />
      </div>
    </div>
  )
}