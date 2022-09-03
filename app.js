require('dotenv').config();

const express = require('express');
require('express-async-errors');

const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

// Routes
const customerRouter = require('./domains/customer/routes/api.route')

const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found');
const {versionUrlPrefix} = require('./config/api');

// Middlewares
app.set('trust proxy', 1);

app.use([
  logger('dev'),
  cors(),
  helmet(),
  express.json(),
  express.urlencoded({ extended: false })
])

app.use(versionUrlPrefix, customerRouter);

// Debug routes
// app._router.stack.forEach(function(r){
//   console.log(r.__handle);
//   if (r.__handle && r.__handle.stack && r.__handle.stack.length){
//     console.log('child 1');
//     r.__handle.stack.forEach(function(e){
//       if (e.__handle && e.__handle.stack && e.__handle.stack.length){
        
//         console.log('child 2');
//         e.__handle.stack.forEach(function(j){
//           console.log(j);
//         })
//       }
//     })
//   }
// })

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