const express = require("express");

const clothingItems = require("../controllers/clothingItems");

const router = express.Router();

router.get("/items", clothingItems.getItems);
router.get("/items/:itemId", clothingItems.getItem);
router.post("/items", clothingItems.createItem);
router.delete("/items/:itemId", clothingItems.deleteItem);
router.put("/items/:itemId/likes", clothingItems.likeItem);
router.delete(
  "/items/:itemId/likes",
  clothingItems.dislikeItem
);


module.exports = router;