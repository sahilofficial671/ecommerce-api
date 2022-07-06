const router = require('express').Router()

const controller = require('../controllers/category.controller')

router
    .get('/', controller.getCategories)
    .post('/', controller.createCategory)

module.exports = router.use('/category', router)