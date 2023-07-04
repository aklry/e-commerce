const express = require('express');

const router = express.Router();
const sqlHandler = require('../mysql/index')

//获取商品的评价
router.get('/getEvaluation', (req, res, next) => {
    const sql = 'select * from evaluation where productId = ?'
    sqlHandler(sql, [req.query.productId], results => {
        res.send({
            code: '00000',
            records: results
        })
    })
})

module.exports = router