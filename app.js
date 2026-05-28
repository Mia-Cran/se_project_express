const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');

const usersRouter = require('./routes/users');
const clothingItemsRouter = require('./routes/clothingItems');
const { NOT_FOUND } = require('./utils/errors');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});

app.use(usersRouter);
app.use(clothingItemsRouter);

const PORT = 3001;

app.use((req, res) => {
  res.status(NOT_FOUND).send({
    message: 'Requested resource not found',
  });
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
