const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: '3306'
})

pool.getConnection(function(err){
    if (err){
       console.log(err)
    }
    console.log('Database is connected successfully.')
})

module.exports = pool