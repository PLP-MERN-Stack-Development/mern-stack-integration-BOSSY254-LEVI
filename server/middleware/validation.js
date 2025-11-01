// validation.js - Input validation middleware using Joi

const Joi = require('joi');

// Validation schemas
const postSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  content: Joi.string().min(1).required(),
  excerpt: Joi.string().max(200).optional(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).optional(),
  isPublished: Joi.boolean().optional(),
});

const categorySchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  description: Joi.string().max(200).optional(),
  color: Joi.string().optional(),
});

const userSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  bio: Joi.string().max(500).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const commentSchema = Joi.object({
  content: Joi.string().min(1).required(),
});

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors,
      });
    }

    next();
  };
};

module.exports = {
  validatePost: validate(postSchema),
  validateCategory: validate(categorySchema),
  validateUser: validate(userSchema),
  validateLogin: validate(loginSchema),
  validateComment: validate(commentSchema),
};
