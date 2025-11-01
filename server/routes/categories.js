// server/routes/categories.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Category = require('../models/Category');
const { protect, authorize } = require('../middleware/auth'); // ✅ fixed import

// GET /api/categories - Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/categories - Create a new category (only for authenticated users, optionally admin)
router.post(
  '/',
  [
    protect, // ✅ must be a function, not an object
    // authorize('admin'), // 🔒 uncomment this if only admins can create categories
    body('name').notEmpty().withMessage('Name is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description } = req.body;

      // Check if category already exists
      let category = await Category.findOne({ name });
      if (category) {
        return res.status(400).json({ message: 'Category already exists' });
      }

      // Create new category
      category = new Category({
        name,
        description,
      });

      await category.save();
      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

