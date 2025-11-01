const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Please add comment content'],
    maxlength: [500, 'Comment cannot be more than 500 characters']
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: true
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
