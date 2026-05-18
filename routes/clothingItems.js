const express = require('express');
const clothingItems = require('../controllers/clothingItems');

const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/items', clothingItems.getItems);
router.get('/items/:itemId', clothingItems.getItem);
router.post('/items', auth, clothingItems.createItem);
router.delete('/items/:itemId', auth, clothingItems.deleteItem);
router.put('/items/:itemId/likes', auth, clothingItems.likeItem);
router.delete(
  '/items/:itemId/likes',
  auth,
  clothingItems.dislikeItem,
);

module.exports = router;
