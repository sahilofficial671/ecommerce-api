require('dotenv').config();

const express = require('express');
require('express-async-errors');

const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('./routes/auth.route')
const productsRouter = require('./routes/products.route')
const categoryRouter = require('./routes/category.route')

const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found');
const {versionUrlPrefix} = require('./core/version');

// Middlewares
app.set('trust proxy', 1);

app.use([
  logger('dev'),
  cors(),
  helmet(),
  express.json(),
  express.urlencoded({ extended: false })
])

app.use(versionUrlPrefix + '/auth', authRouter)
  .use(versionUrlPrefix + '/products', productsRouter)
  .use(versionUrlPrefix + '/categories', categoryRouter)

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