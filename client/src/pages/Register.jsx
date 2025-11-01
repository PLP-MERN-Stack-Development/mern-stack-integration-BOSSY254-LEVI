// client/src/pages/Register.jsx
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

export const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const { register: registerUser, loading } = useAuth()
  const navigate = useNavigate()
  
  const password = watch('password')

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data.username, data.email, data.password)
      
      if (result.success) {
        toast.success('Registration successful!')
        navigate('/')
      } else {
        toast.error(result.message || 'Registration failed')
      }
    } catch (error) {
      toast.error('An error occurred during registration')
      console.error(error)
    }
  }

  return (
    <div className="auth-form">
      <h1>Register</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
        </div>
        
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
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            {...register('confirmPassword', { 
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      
      <p className="auth-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}