const express = require('express');
const clothingItems = require('../controllers/clothingItems');
const auth = require('../middlewares/auth');
const {
  validateClothingItemBody,
  validateItemId,
} = require('../middlewares/validation');

const router = express.Router();

router.get('/', clothingItems.getItems);
router.get('/:itemId', validateItemId, clothingItems.getItem);
router.post('/', auth, validateClothingItemBody, clothingItems.createItem);
router.delete('/:itemId', auth, validateItemId, clothingItems.deleteItem);
router.put('/:itemId/likes', auth, validateItemId, clothingItems.likeItem);
router.delete(
  '/:itemId/likes',
  auth,
  validateItemId,
  clothingItems.dislikeItem,
);

module.exports = router;
