const express = require('express');

const router = express.Router();
const sqlHandler = require('../mysql/index')

//添加订单信息
router.post('/add', (req, res, next) => {
    const sql = 'insert into orders values (null, ?, ?, ?, ?, ?)'
    const { product, addressId, count, total } = req.body
    sqlHandler(sql, [product, addressId, count, total, 0], results => {
        if (results.affectedRows) {
            res.send({ code: '00000' })
        } else {
            res.send({ code: '-1' })
        }
    })
})
//获取所有订单信息
router.get('/list', (req, res, next) => {
    const sql = 'select * from orders'
    sqlHandler(sql, [], results => {
        res.send({
            code: '00000',
            records: results
        })
    })
})
//删除订单信息
router.post('/delete', (req, res, next) => {
    const { id } = req.body
    const sql = 'delete from orders where id = ?'
    sqlHandler(sql, [id], results => {
        if (results.affectedRows) {
            res.send({ code: '00000', msg: '删除成功' })
        } else {
            res.send({ code: '-1', msg: '删除失败' })
        }
    })
})

module.exports = router