const router = require('express').Router()

const controller = require('../controllers/products.controller')

router
    .get('/:slug', controller.getProduct)
    .get('/', controller.getProducts)
    .post('/', controller.createProduct)

module.exports = router;
