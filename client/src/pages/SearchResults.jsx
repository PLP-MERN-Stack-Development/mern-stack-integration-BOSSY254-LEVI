// client/src/pages/SearchResults.jsx
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSearchPosts } from '../hooks/usePost'
import { Pagination } from '../components/Pagination'
import { Loading } from '../components/Loading'

export const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const category = searchParams.get('category') || ''
  const [currentPage, setCurrentPage] = useState(1)
  
  const { posts, loading, totalPages, totalPosts } = useSearchPosts(query, category, currentPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="search-results">
      <h1>Search Results</h1>
      <p className="search-query">
        {query && `Searching for: "${query}"`}
        {category && ` in category: "${category}"`}
      </p>
      <p className="post-count">Found {totalPosts} posts</p>
      
      {posts.length > 0 ? (
        <>
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
        </>
      ) : (
        <div className="no-results">
          <p>No posts found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}