// client/src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MERN Blog</Link>
      </div>
      <div className="navbar-nav">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        {isAuthenticated ? (
          <>
            <Link to="/create">Create Post</Link>
            <button onClick={handleLogout} className="btn btn-link">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}