const mysql = require('mysql')

let config = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'livable'
}

const connection = mysql.createConnection(config)


const sqlHandler = (sql, parameters, callback) => {
    connection.query(sql, parameters, (error, results) => {
        if (error) throw new Error(error)
        callback(results)
    })
}

module.exports = sqlHandler