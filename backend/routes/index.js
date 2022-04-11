const express = require('express')
const router = express.Router()
const db = require('../config')

router.post('/register', async (req, res, next) => {
    db.query(
        // first checks if the email already exists.
        `SELECT * FROM users WHERE LOWER(email) = LOWER(
            ${db.escape(req.body.email)})`,
        (err, result) => {
            // if email found.
            if (result.length) {
                return res.status(409).send({
                    msg: 'Email taken.'
                })
            }
            else if (err)
            {
                return res.status(400).send({
                    msg: err
                });
            }
            // now to insert user with email and password.
            else {
                db.query(`INSERT INTO users (email, password, userLevel) VALUES('${req.body.email}', '${req.body.password}', '${req.body.userLevel}')`,
                    (err, result) => {
                        if (err) {
                            return res.status(400).send({
                                msg: err
                            });
                        } // successful queries above, send success status message.
                        else{
                            return res.status(201).send({
                                msg: 'User registered.'
                            })
                        }
                    }
                )
            }
        }
    )
});

router.post('/login', async (req, res, next) => {
    db.query(
        // checks is user email exists.
        `SELECT * FROM users WHERE LOWER(email) = LOWER(
            ${db.escape(req.body.email)})`,
        (err, result) => {
            // if email found, check password.
            if (result.length) {
                // if password matches, return a success response.
                if (result[0].password == req.body.password)
                {
                    return res.status(200).send({
                        msg: 'User logged in.'
                    })
                }
                // info mismatch / user does not exist 
                else
                {
                    return res.status(403).send({
                        msg: 'Incorrect information.'
                    })
                }
            }
            else if (err)
            {
                return res.status(400).send({
                    msg: err
                });
            }
            // email not found.
            else
            {
                return res.status(403).send({
                    msg: 'Incorrect information.'
                })
            }
        }
    )
});

module.exports = router;