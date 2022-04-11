const mysql = require('mysql')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Khaanhcop4710@',
    database: 'events',
    port: '3306'
})

let eventsdb = {};

eventsdb.all = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM users`, (err, results) => {
            if (err){
                return reject(err);
            }

            return resolve(results)
        })
    })
};

module.exports = eventsdb