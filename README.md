# MERN Stack Blog Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) blog application with authentication, posts management, categories, comments, search, and pagination.

## 🚀 Features

- **User Authentication**: JWT-based authentication with registration and login
- **Blog Posts**: Full CRUD operations for blog posts
- **Categories**: Organize posts by categories
- **Comments**: Users can comment on posts
- **Search**: Search posts by title and content
- **Pagination**: Paginated post listings
- **Image Uploads**: Support for featured images (framework ready)
- **Responsive Design**: Mobile-friendly UI
- **Admin Features**: Admin users can manage categories and all posts

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **multer** - File uploads
- **Joi** - Input validation
- **helmet** - Security middleware
- **express-rate-limit** - Rate limiting

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **CSS3** - Styling

## 📁 Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   ├── index.html          # HTML template
│   ├── vite.config.js      # Vite configuration
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PLP-MERN-Stack-Development/react-js-jsx-and-css-mastering-front-end-development-BOSSY254-LEVI.git
   cd mern-stack-integration-BOSSY254-LEVI
   ```

2. **Set up the server**
   ```bash
   cd server
   npm install
   cp .env
   ```

3. **Set up the client**
   ```bash
   cd ../client
   npm install
   cp .env.example .env
   # Edit .env if needed (default API URL should work)
   ```

4. **Start MongoDB**
   - If using local MongoDB, ensure it's running on default port
   - If using MongoDB Atlas, update the connection string in server/.env

5. **Start the development servers**

   **Terminal 1 - Server:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Client:**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🔧 Configuration

### Environment Variables

**Server (.env)**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d
MAX_FILE_SIZE=5000000
FILE_UPLOAD_PATH=./uploads
```

**Client (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Posts Endpoints

#### Get All Posts
```http
GET /api/posts?page=1&limit=10&category=categoryId
```

#### Get Single Post
```http
GET /api/posts/:id
```

#### Create Post
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Post Title",
  "content": "Post content...",
  "category": "categoryId",
  "tags": ["tag1", "tag2"],
  "isPublished": true
}
```

#### Update Post
```http
PUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

#### Delete Post
```http
DELETE /api/posts/:id
Authorization: Bearer <token>
```

#### Add Comment
```http
POST /api/posts/:id/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "This is a comment"
}
```

#### Search Posts
```http
GET /api/posts/search?q=searchTerm
```

### Categories Endpoints

#### Get All Categories
```http
GET /api/categories
```

#### Create Category (Admin only)
```http
POST /api/categories
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Technology",
  "description": "Tech related posts"
}
```

## 🧪 Testing the API

You can test the API endpoints using tools like Postman, curl, or the built-in browser developer tools.

### Sample API Calls

1. **Register a user:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

2. **Login:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Create a category (as admin):**
   ```bash
   curl -X POST http://localhost:5000/api/categories \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
     -d '{"name":"Technology","description":"Tech posts"}'
   ```

4. **Create a post:**
   ```bash
   curl -X POST http://localhost:5000/api/posts \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -d '{"title":"My First Post","content":"Hello World!","category":"CATEGORY_ID"}'
   ```

## 🎨 UI Screenshots

### Home Page
- Displays paginated list of published posts
- Search functionality
- Category filtering
- Navigation bar with auth status

### Post Detail Page
- Full post content
- Author information
- Comments section
- Edit/delete buttons for authorized users

### Create/Edit Post
- Rich text forms
- Category selection
- Tag management
- Publish/draft options

### Authentication
- Login and registration forms
- Form validation
- Error handling

## 🔐 User Roles

- **User**: Can create, edit, delete their own posts and comments
- **Admin**: Can manage all posts, categories, and users

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in environment variables
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Set strong JWT secrets
4. Configure proper CORS origins
5. Use a process manager like PM2

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Serve the `dist` folder using a static file server
3. Configure the API URL in production environment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For questions or issues, please open an issue in the repository or contact the development team.

---

**Note**: This application includes comprehensive error handling, input validation, and security measures suitable for production use. Make sure to review and update security configurations before deploying to production.
