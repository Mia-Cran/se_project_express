const ClothingItem = require("../models/clothingItem");

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
    .catch((err) => res.status(500).send(err));
};

// DELETE item
module.exports.deleteItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .then((item) => res.send(item))
    .catch((err) => res.status(500).send(err));
};