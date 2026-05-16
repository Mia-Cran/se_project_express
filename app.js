const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const usersRouter = require('./routes/users');
const auth = require('./middlewares/auth');

const app = express();
const clothingItemsRouter = require('./routes/clothingItems');

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use(usersRouter);
app.use(auth);
app.use(clothingItemsRouter);

const PORT = 3001;

app.use((req, res) => {
  res.status(404).send({
    message: 'Requested resource not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
