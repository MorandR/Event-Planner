const express = require('express')
const app = express()
const mysql = require('mysql')
const port = process.env.PORT || 3000
const routes = require('./routes')



app.use(express.json())

app.use('/api/events', routes)

app.listen(port, () => {
    console.log(`running on port ${port}`)
})