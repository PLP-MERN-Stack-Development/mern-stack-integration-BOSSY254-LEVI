const express = require('express');
const router = express.Router();
const {
  getComments,
  addComment,
  deleteComment
} = require('../controllers/comments');
const { protect } = require('../middleware/auth');

router
  .route('/:postId')
  .get(getComments)
  .post(protect, addComment);

router
  .route('/:id')
  .delete(protect, deleteComment);

module.exports = router;
