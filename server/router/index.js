const express = require('express')
//http://localhost:3030/api/product
const router = express.Router()

const sqlHandler = require('../mysql/index')

router.get('/product', (req, res, next) => {
    const sql = 'select * from product where id = ?'
    sqlHandler(sql, [1], results => {
        res.send({
            code: 200,
            records: results
        })
    })

})

module.exports = router