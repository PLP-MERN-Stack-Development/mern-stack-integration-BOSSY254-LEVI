# TODO List for MERN Blog Application

## Server Setup
- [x] Create server/package.json with all dependencies (express, mongoose, cors, dotenv, bcryptjs, jsonwebtoken, multer, joi, express-validator, etc.)
- [x] Create server/.env.example with MongoDB URI, JWT secret, PORT, etc.
- [x] Create server/models/Category.js
- [x] Create server/models/User.js
- [x] Create server/routes/posts.js
- [x] Create server/routes/categories.js
- [x] Create server/routes/auth.js
- [x] Create server/controllers/posts.js
- [x] Create server/controllers/categories.js
- [x] Create server/controllers/auth.js
- [x] Create server/middleware/auth.js
- [x] Create server/middleware/errorHandler.js
- [x] Create server/middleware/validation.js
- [x] Update server/server.js if needed (ensure routes are properly imported)

## Client Setup
- [x] Create client/package.json with React, Vite, axios, react-router-dom, etc.
- [x] Create client/vite.config.js with proxy to server
- [x] Create client/.env.example
- [x] Create client/src/App.jsx with React Router setup
- [x] Create client/src/components/Navbar.jsx
- [x] Create client/src/components/PostList.jsx
- [x] Create client/src/components/PostDetail.jsx
- [x] Create client/src/components/PostForm.jsx
- [x] Create client/src/components/CategoryList.jsx
- [x] Create client/src/components/Login.jsx
- [x] Create client/src/components/Register.jsx
- [x] Create client/src/pages/Home.jsx
- [x] Create client/src/pages/PostDetailPage.jsx
- [x] Create client/src/pages/CreatePostPage.jsx
- [x] Create client/src/pages/EditPostPage.jsx
- [x] Create client/src/hooks/useApi.js
- [x] Create client/src/hooks/useAuth.js
- [x] Create client/src/context/AuthContext.jsx
- [x] Create client/src/hooks/usePosts.js (fixed import error)

## Integration and Features
- [x] Implement all API endpoints with validation and error handling
- [x] Add JWT authentication
- [x] Add image uploads with multer
- [x] Add pagination for posts
- [x] Add search functionality
- [x] Add comments feature
- [x] Implement forms with validation
- [x] Add optimistic UI updates
- [x] Handle loading and error states

## Followup Steps
- [x] Install server dependencies (npm install in server/)
- [x] Install client dependencies (npm install in client/)
- [x] Set up MongoDB (local or Atlas)
- [x] Test the application end-to-end
- [x] Update README.md with documentation, screenshots, API docs
