const mysql = require('mysql')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Khaanhcop4710@',
    database: 'events',
    port: '3306'
})

pool.getConnection(function(err){
    if (err){
       console.log(err)
    }
    console.log('Database is connected successfully.')
})

module.exports = pool