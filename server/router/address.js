const express = require('express');

const router = express.Router();
const sqlHandler = require('../mysql/index')

//获取所有地址信息
router.get('/list', (req, res, next) => {
    const sql = 'select * from address'
    sqlHandler(sql, [], results => {
        res.send({
            code: '00000',
            records: results
        })
    })
})
//新增地址信息
router.post('/add', (req, res, next) => {
    const sql = 'insert into address values (null, ?, ?, ?, ?, ?)'
    const { name, tel, area, address, labelArea } = req.body
    sqlHandler(sql, [name, tel, area, address, labelArea], results => {
        if (results.affectedRows) {
            res.send({
                code: '00000',
                msg: '新增成功'
            })
        } else {
            res.send({
                code: '-1',
                msg: '新增失败'
            })
        }
    })
})

//修改地址信息
router.post('/update', (req, res, next) => {
    const sql = 'update address set name = ?,tel = ?, area = ?, address = ?, labelArea = ? where id = ?'
    const { name, tel, area, address, labelArea, id } = req.body
    sqlHandler(sql, [name, tel, area, address, labelArea, id], results => {
        if (results.affectedRows) {
            res.send({
                code: '00000',
                msg: '修改成功'
            })
        } else {
            res.send({
                code: '-1',
                msg: '修改失败'
            })
        }
    })
})
//删除地址信息
router.post('/delete', (req, res, next) => {
    const sql = 'delete from address where id = ?'
    const { id } = req.body
    sqlHandler(sql, [id], results => {
        if (results.affectedRows) {
            res.send({
                code: '00000',
                msg: '删除成功'
            })
        } else {
            res.send({
                code: '-1',
                msg: '删除失败'
            })
        }
    })
})
module.exports = router