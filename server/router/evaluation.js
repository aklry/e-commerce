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
//添加商品评价
router.post('/add', function (req, res, next) {

    const { orderId, productId, descs, productRate, serviceRate, logisticsRate } = req.body
    const sql = 'select evaluated from orders where id=?'
    sqlHandler(sql, [orderId], function (data) {
        if (data && data.length && data[0].evaluated) {
            const sql = 'update evaluation set productId=?,descs=?,productRate=?,serviceRate=?,logisticsRate=? where orderId=?'
            sqlHandler(sql, [productId, descs, productRate, serviceRate, logisticsRate, orderId], function (data) {
                if (data.affectedRows) {
                    res.send({ code: '00000', })

                } else {
                    res.send({ code: '-1' })
                }
            })
        } else {
            const updateSql = 'update orders set evaluated=1 where id=?'
            sqlHandler(updateSql, [orderId], function (data) {
                if (data.affectedRows) {
                    const sql = 'insert into evaluation values (null,?,?,?,?,?,?)'
                    sqlHandler(sql, [orderId, productId, descs, productRate, serviceRate, logisticsRate], function (data) {
                        if (data.affectedRows) {
                            res.send({ code: '00000', })

                        } else {
                            res.send({ code: '-1' })
                        }
                    })
                } else {
                    res.send({ code: '-1' })
                }
            })


        }
    })

})

//根据orderId获取评价
router.get('/getByOrderId', (req, res, next) => {
    const sql = 'select * from evaluation where orderId = ?'
    sqlHandler(sql, [req.query.orderId], results => { res.send({ code: '00000', records: results[0] }) })
})

module.exports = router