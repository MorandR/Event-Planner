import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import database from './database.js'
import 'dotenv/config';


const app = espress()
const port = 8000 ;
const hort = 'localhost';

app.listen(port,host,() => console.log(`Backend server running on http://${host}:${port}`))

database.connect((err) => {
    if (err) {
        console.log(err)
        throw err
    }
    console.log('✓ MySQL Connected.');
    console.log('---------');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());