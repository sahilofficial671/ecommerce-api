require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');

const authRouter = require('./routes/auth')
const productsRouter = require('./routes/products')
const categoryRouter = require('./routes/category')

const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found');

// Middlewares
app.set('trust proxy', 1);

app.use([
  logger('dev'),
  express.json(),
  express.urlencoded({ extended: false })
])

app.use('/api/v1/auth', authRouter)
  .use('/api/v1/products', productsRouter)
  .use('/api/v1/categories', categoryRouter)

app.use([errorHandlerMiddleware, notFoundMiddleware]);

const port = process.env.PORT || 5000;
const url = process.env.MONGO_URI;

const start = async() => {
    await mongoose.connect(url)
    .then(() => console.log('DB Server Connected.'))
    .catch((error) => console.log(error))

    app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
    );
}

start();