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

module.exports = router