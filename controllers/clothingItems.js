const ClothingItem = require('../models/clothingItem');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const handleItemError = (err, next) => {
  if (err.name === 'CastError') {
    next(new BadRequestError('Invalid item ID'));
  } else if (err.name === 'DocumentNotFoundError') {
    next(new NotFoundError('Item not found'));
  } else if (err.name === 'ValidationError') {
    next(new BadRequestError('Invalid data passed for item creation'));
  } else {
    next(err);
  }
};

module.exports.getItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => handleItemError(err, next));
};

// GET all items
module.exports.getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
};

// CREATE item
module.exports.createItem = (req, res, next) => {
  ClothingItem.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => handleItemError(err, next));
};

// DELETE item
module.exports.deleteItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError('You are not authorized to delete this item');
      }

      return ClothingItem.findByIdAndDelete(req.params.itemId);
    })
    .then((deletedItem) => res.send(deletedItem))
    .catch((err) => handleItemError(err, next));
};

module.exports.likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => handleItemError(err, next));
};

module.exports.dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => handleItemError(err, next));
};
