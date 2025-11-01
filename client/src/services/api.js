import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['x-auth-token'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Posts API
export const postsAPI = {
  getPosts: (page = 1) => api.get(`/posts?page=${page}`),
  getPost: (id) => api.get(`/posts/${id}`),
  createPost: (postData) => {
    const formData = new FormData()
    Object.keys(postData).forEach(key => {
      formData.append(key, postData[key])
    })
    return api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  updatePost: (id, postData) => {
    const formData = new FormData()
    Object.keys(postData).forEach(key => {
      formData.append(key, postData[key])
    })
    return api.put(`/posts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  deletePost: (id) => api.delete(`/posts/${id}`),
  searchPosts: (query, category, page = 1) => {
    let url = `/posts/search?page=${page}`
    if (query) url += `&query=${encodeURIComponent(query)}`
    if (category) url += `&category=${category}`
    return api.get(url)
  }
}

// Categories API
export const categoriesAPI = {
  getCategories: () => api.get('/categories'),
  createCategory: (categoryData) => api.post('/categories', categoryData)
}

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password })
}

// Comments API
export const commentsAPI = {
  getComments: (postId) => api.get(`/comments/${postId}`),
  addComment: (postId, commentData) => api.post(`/comments/${postId}`, commentData)
}

export default api