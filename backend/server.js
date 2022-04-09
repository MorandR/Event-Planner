const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleWare/errorMiddleware')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const cors = require('cors')

connectDB()

const app = express()

// middleware to use .body and cors to access server.
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// imports all of the api's for a user.
app.use('/api/user', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
