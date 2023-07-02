const express = require('express');

const router = express.Router();
const sqlHandler = require('../mysql/index')

router.get('/hotWords', (req, res, next) => {
    const sql = 'select * from hotwords'
    const { pid } = req.query
    sqlHandler(sql, [], results => {
        res.send({
            code: '00000',
            records: results
        })
    })

})
router.get('/getBrand', (req, res, next) => {
    const sql = 'select * from brand where productType = ?'
    const { productType } = req.query
    sqlHandler(sql, [productType], results => {
        res.send({
            code: '00000',
            records: results
        })
    })

})


//获取商品列表
router.get('/getProduct', (req, res, next) => {
    const { count = 0, name, brand, price, sale, city } = req.query
    const sortPrice = price == 2 ? ' desc' : ' asc'
    const brandArr = brand ? brand.split(',') : []
    const brandStr = brandArr.length ?
        brandArr.map((item, index) =>
            (`brand=${item} ${index == brandArr.length - 1 ? '' : 'or '}`)).join(' ')
        : 'brand is not null'
    const sql = `select * from product
    where ${name ? 'locate(?,name)>0' : 'name is not null'}
    and ${city ? 'city=?' : 'city is not null'}  
    and ${brandStr} 
    ${sale == 'false' && price ? 'order by price' + sortPrice : ''} 
    ${sale == 'true' ? 'order by sale desc' : ''}
    limit ${8 * (count)},8`
    sqlHandler(sql, [name, city], results => {
        res.send(
            {
                code: '00000',
                records: results
            }
        )
    })

})

//获取商品详情
router.get('/getDetails', (req, res, next) => {
    const sql = 'select * from product where id=?'
    const { id } = req.query
    sqlHandler(sql, [id], results => {
        res.send({
            code: '00000',
            record: results[0]
        })
    })
})

//收藏商品
router.post('/star', (req, res, next) => {
    const sql = 'insert into star values (?)'
    const { productId } = req.body
    sqlHandler(sql, [productId], results => {
        if (results.affectedRows) {
            res.send({ code: '00000', msg: '收藏成功' })
        } else {
            res.send({ code: '-1', msg: '收藏失败' })
        }
    })
})

//取消收藏商品
router.post('/cancelStar', (req, res, next) => {
    const sql = 'delete from star where productId = ?'
    const { productId } = req.body
    sqlHandler(sql, [productId], results => {
        if (results.affectedRows) {
            res.send({ code: '00000', msg: '已取消收藏' })
        } else {
            res.send({ code: '-1', msg: '取消收藏失败' })
        }
    })
})

//获取所有已收藏商品
router.get('/listStared', (req, res, next) => {
    const sql = 'select * from star'
    sqlHandler(sql, [], results => {
        res.send({
            code: '00000',
            records: results
        })
    })
})

module.exports = router