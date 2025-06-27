const express = require('express')
const { listProducts, productDetails, totalPrice, inStock } = require('../Services/productsService')
const router = express.Router()

router.get('/list', listProducts)
router.get('/details/:id', productDetails)
router.get('/total_price/:id/:qt', totalPrice)
router.get('/inStock/:qt', inStock)

module.exports = router