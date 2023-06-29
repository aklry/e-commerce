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

module.exports = router