import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postService, categoryService } from '../services/api';
import { useApi } from '../hooks/useApi';
import { ClipLoader } from 'react-spinners';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, error, execute } = useApi();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [currentPage, selectedCategory]);

  const fetchPosts = async () => {
    try {
      const response = await execute(() =>
        postService.getAllPosts(currentPage, 10, selectedCategory || null)
      );
      setPosts(response.data);
      setPagination(response.pagination);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await execute(() => categoryService.getAllCategories());
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchPosts();
      return;
    }

    try {
      const response = await execute(() => postService.searchPosts(searchQuery));
      setPosts(response.data);
      setPagination(null);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setSearchQuery('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="post-list">
      <div className="post-list-header">
        <h1>Blog Posts</h1>

        <div className="post-list-controls">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>

          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="category-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">
          <ClipLoader size={50} color="#007bff" />
        </div>
      ) : (
        <>
          <div className="posts-grid">
            {posts.map((post) => (
              <article key={post._id} className="post-card">
                {post.featuredImage && (
                  <img
                    src={`http://localhost:5000/${post.featuredImage}`}
                    alt={post.title}
                    className="post-image"
                  />
                )}

                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-category" style={{ backgroundColor: post.category?.color }}>
                      {post.category?.name}
                    </span>
                    <span className="post-date">{formatDate(post.createdAt)}</span>
                  </div>

                  <h2 className="post-title">
                    <Link to={`/posts/${post._id}`}>{post.title}</Link>
                  </h2>

                  <p className="post-excerpt">
                    {post.excerpt || post.content.substring(0, 150) + '...'}
                  </p>

                  <div className="post-footer">
                    <span className="post-author">By {post.author?.name}</span>
                    <div className="post-stats">
                      <span>{post.viewCount} views</span>
                      <span>{post.comments?.length || 0} comments</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="no-posts">
              <p>No posts found.</p>
            </div>
          )}

          {pagination && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={!pagination.prev}
                className="btn btn-secondary"
              >
                Previous
              </button>

              <span className="pagination-info">
                Page {currentPage} of {Math.ceil((pagination.total || posts.length * currentPage) / 10)}
              </span>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!pagination.next}
                className="btn btn-secondary"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
