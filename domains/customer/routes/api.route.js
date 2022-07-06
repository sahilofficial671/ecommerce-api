const router = require('express').Router()

router.use('/auth', require('./auth.route'))
  .use('/category', require('./category.route'))
  .use('/products', require('./products.route'))

module.exports = router