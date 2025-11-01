// client/src/pages/Login.jsx
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const result = await login(data.email, data.password)
      
      if (result.success) {
        toast.success('Login successful!')
        navigate('/')
      } else {
        toast.error(result.message || 'Login failed')
      }
    } catch (error) {
      toast.error('An error occurred during login')
      console.error(error)
    }
  }

  return (
    <div className="auth-form">
      <h1>Login</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <p className="auth-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}