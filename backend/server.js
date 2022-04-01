const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleWare/errorMiddleware')
const port = process.env.PORT || 5000

const app = express()

// middleware to use .body
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/user', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
