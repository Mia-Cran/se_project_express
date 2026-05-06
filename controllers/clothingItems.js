const ClothingItem = require('../models/clothingItem');
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require('../utils/errors');

module.exports.getItem = (req, res) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({
          message: 'Invalid item ID',
        });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({
          message: 'Item not found',
        });
      } else {
        res.status(SERVER_ERROR).send({
          message: 'An error has occurred on the server.',
        });
      }
    });
};

// GET all items
module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => res.status(500).send(err));
};

// CREATE item
module.exports.createItem = (req, res) => {
  ClothingItem.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Invalid data passed for item creation',
        });
      } else {
        res.status(SERVER_ERROR).send({
          message: 'An error has occurred on the server.',
        });
      }
    });
};

// DELETE item
module.exports.deleteItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({
          message: 'Invalid item ID',
        });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({
          message: 'Item not found',
        });
      } else {
        res.status(SERVER_ERROR).send({
          message: 'An error has occurred on the server.',
        });
      }
    });
};
module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({
          message: 'Invalid item ID',
        });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({
          message: 'Item not found',
        });
      } else {
        res.status(SERVER_ERROR).send({
          message: 'An error has occurred on the server.',
        });
      }
    });
};

module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({
          message: 'Invalid item ID',
        });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({
          message: 'Item not found',
        });
      } else {
        res.status(SERVER_ERROR).send({
          message: 'An error has occurred on the server.',
        });
      }
    });
};
