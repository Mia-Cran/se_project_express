const express = require('express');
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/users');
const {
  validateUserId,
  validateUpdateUser,
} = require('../middlewares/validation');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, validateUpdateUser, updateCurrentUser);
router.get('/:userId', validateUserId, getUser);

module.exports = router;
