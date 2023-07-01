const express = require('express');

const router = express.Router();
const sqlHandler = require('../mysql/index')

router.get('/getList', (req, res, next) => {
    const sql = 'select * from types where pid = ?'
    const { pid } = req.query
    sqlHandler(sql, [pid], results => {
        res.send({
            code: '00000',
            records: results
        })
    })

})
//获取商品分类的id值
router.get('/getTypeId', (req, res, next) => {
    const sql = 'select * from types where locate(name,?)'
    const { name } = req.query
    sqlHandler(sql, [name], results => {
        const data = results && results.length ? results[0] : {}
        res.send({
            code: '00000',
            record: data
        })
    })

})

module.exports = router