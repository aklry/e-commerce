const express = require('express')
const router = require('./router/index')

const app = express()
app.use('/api', router)

app.listen(3030, () => {
    console.log('服务器运行在3030端口')
})