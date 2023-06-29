const express = require('express')
//http://localhost:3030/api/product
const router = express.Router()

const types = require('./type')

router.use('/types', types)

module.exports = router