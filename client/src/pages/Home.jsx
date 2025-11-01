import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'
import { Pagination } from '../components/Pagination'
import { Loading } from '../components/Loading'

export const Home = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { posts, loading, totalPages, totalPosts } = usePosts(currentPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="home">
      <h1>Latest Blog Posts</h1>
      <p className="post-count">Showing {posts.length} of {totalPosts} posts</p>
      
      <div className="posts-grid">
        {posts.map(post => (
          <div key={post._id} className="post-card">
            {post.featuredImage && (
              <img 
                src={`http://localhost:5000/${post.featuredImage}`} 
                alt={post.title} 
                className="post-image"
              />
            )}
            <div className="post-content">
              <h2 className="post-title">
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
              </h2>
              <p className="post-excerpt">{post.excerpt || post.content.substring(0, 150) + '...'}</p>
              <div className="post-meta">
                <span>By {post.author.username}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="post-category">{post.category.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      )}
    </div>
  )
}