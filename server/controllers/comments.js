const Comment = require('../models/Comment'); // ✅ FIXED: Singular filename
const Post = require('../models/Post');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get comments for a post
// @route   GET /api/comments/:postId
// @access  Public
exports.getComments = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.postId}`, 404)
    );
  }

  const comments = await Comment.find({ post: req.params.postId })
    .populate({
      path: 'author',
      select: 'username',
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: comments.length,
    data: comments,
  });
});

// @desc    Add comment to a post
// @route   POST /api/comments/:postId
// @access  Private
exports.addComment = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.postId}`, 404)
    );
  }

  // ✅ Set author and post IDs correctly
  req.body.post = req.params.postId;
  req.body.author = req.user.id;

  const comment = await Comment.create(req.body);

  res.status(201).json({
    success: true,
    data: comment,
  });
});

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404)
    );
  }

  // ✅ Only the owner or an admin can delete
  if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this comment`,
        401
      )
    );
  }

  await comment.deleteOne(); // ✅ Modern method instead of deprecated .remove()

  res.status(200).json({
    success: true,
    data: {},
  });
});
