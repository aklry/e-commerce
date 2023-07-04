const express = require('express')
//http://localhost:3030/api/product
const router = express.Router()

const types = require('./type')
const product = require('./product')
const evaluation = require('./evaluation')

router.use('/types', types)
router.use('/product', product)
router.use('/evaluation', evaluation)

module.exports = router