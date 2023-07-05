const express = require('express')
//http://localhost:3030/api/product
const router = express.Router()

const types = require('./type')
const product = require('./product')
const evaluation = require('./evaluation')
const address = require('./address')
const orders = require('./order')

router.use('/types', types)
router.use('/product', product)
router.use('/evaluation', evaluation)
router.use('/address', address)
router.use('/orders', orders)

module.exports = router