// server/routes/posts.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const { protect } = require('../middleware/auth'); // ✅ fixed import
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// GET /api/posts - Get all blog posts
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate('author', 'username')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments();

    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/posts/search - Search posts
router.get('/search', async (req, res) => {
  try {
    const { query, category } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let searchQuery = { published: true };

    if (query) {
      searchQuery.$text = { $search: query };
    }

    if (category) {
      searchQuery.category = category;
    }

    const posts = await Post.find(searchQuery)
      .populate('author', 'username')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(searchQuery);

    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/posts/:id - Get a specific blog post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username')
      .populate('category', 'name');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/posts - Create a new blog post
router.post(
  '/',
  [
    protect, // ✅ use protect middleware instead of auth
    upload.single('featuredImage'),
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, content, excerpt, category, tags, published } = req.body;

      const newPost = new Post({
        title,
        content,
        excerpt,
        category,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        published: published === 'true',
        author: req.user.id,
        featuredImage: req.file ? req.file.path : '',
      });

      const post = await newPost.save();
      await post.populate('author', 'username');
      await post.populate('category', 'name');

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// PUT /api/posts/:id - Update an existing blog post
router.put(
  '/:id',
  [
    protect,
    upload.single('featuredImage'),
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, content, excerpt, category, tags, published } = req.body;

      let post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Not authorized' });
      }

      post.title = title;
      post.content = content;
      post.excerpt = excerpt;
      post.category = category;
      post.tags = tags ? tags.split(',').map(tag => tag.trim()) : [];
      post.published = published === 'true';

      if (req.file) {
        post.featuredImage = req.file.path;
      }

      await post.save();
      await post.populate('author', 'username');
      await post.populate('category', 'name');

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// DELETE /api/posts/:id - Delete a blog post
router.delete('/:id', protect, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Post.findByIdAndRemove(req.params.id);
    res.json({ message: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
