const express = require('express');
const {
  register,
  login,
  getMe,
  logout,
  updateDetails,
  updatePassword,
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');
const { validateUser, validateLogin } = require('../middleware/validation');

router.post('/register', validateUser, register);
router.post('/login', validateLogin, login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;
