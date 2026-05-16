const express = require('express');
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUser,
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/users');

const router = express.Router();

router.get('/users/me', auth, getCurrentUser);
router.patch('/users/me', auth, updateCurrentUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
router.post('/signup', createUser);
router.post('/signin', login);
module.exports = router;
