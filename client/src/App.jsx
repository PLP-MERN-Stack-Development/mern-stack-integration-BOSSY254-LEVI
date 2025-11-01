// client/src/App.jsx
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { PostDetail } from './pages/PostDetail'
import { CreatePost } from './pages/CreatePost'
import { EditPost } from './pages/EditPost'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { SearchResults } from './pages/SearchResults'
import { ProtectedRoute } from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          } />
          <Route path="/edit/:id" element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  )
}

export default App