const express = require('express')
const app = express()
const mysql = require('mysql')
const port = process.env.PORT || 3000
const routes = require('./routes')
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.use('/api', routes)

app.listen(port, () => {
    console.log(`running on port ${port}`)
})