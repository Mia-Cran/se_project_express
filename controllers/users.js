const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require('../utils/errors');

// GET all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.error(err);

      res.status(SERVER_ERROR).send({
        message: 'An error has occurred on the server.',
      });
    });
};

// GET user by ID
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({
          message: 'Invalid user ID',
        });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({
          message: 'User not found',
        });
      } else {
        res.status(SERVER_ERROR).send({
          message: 'An error has occurred on the server.',
        });
      }
    });
};

// CREATE user
module.exports.createUser = (req, res) => {
  const {
    name, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      console.error(err);

      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Invalid data passed for user creation',
        });
      } else {
        res.status(SERVER_ERROR).send({
          message: 'An error has occurred on the server.',
        });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'));
        }

        const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
          expiresIn: '7d',
        });

        return res.send({ token });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(401).send({ message: 'Incorrect email or password' });
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.error(err);

      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({
          message: 'User not found',
        });
      } else {
        res.status(SERVER_ERROR).send({
          message: 'An error has occurred on the server.',
        });
      }
    });
};

module.exports.updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.error(err);

      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Invalid data passed for update',
        });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({
          message: 'User not found',
        });
      } else {
        res.status(SERVER_ERROR).send({
          message: 'An error has occurred on the server.',
        });
      }
    });
};
