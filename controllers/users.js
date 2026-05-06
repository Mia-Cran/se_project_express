const User = require("../models/user");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

// GET all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// GET user by ID
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: "Invalid user ID",
        });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({
          message: "User not found",
        });
      } else {
        res.status(SERVER_ERROR).send({
          message: "An error has occurred on the server.",
        });
      }
    });
};

// CREATE user
module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({
          message: "Invalid data passed for user creation",
        });
      } else {
        res.status(SERVER_ERROR).send({
          message: "An error has occurred on the server.",
        });
      }
    });
};
