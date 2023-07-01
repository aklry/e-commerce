const express = require('express')
//http://localhost:3030/api/product
const router = express.Router()

const types = require('./type')
const product = require('./product')

router.use('/types', types)
router.use('/product', product)

module.exports = router