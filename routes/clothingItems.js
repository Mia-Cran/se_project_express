const express = require("express");

const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");

const router = express.Router();

router.get("/items", getItems);
router.post("/items", createItem);
router.delete("/items/:itemId", deleteItem);

module.exports = router;