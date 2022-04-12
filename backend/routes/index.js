const express = require('express')
const router = express.Router()
const db = require('../config')

// wait function to prevent needed info from getting grabbed by next query before its ready
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

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
            // now to insert user with email and password. check userLevel to decide if a univ profile needs to be created
            else { // if userLevel is NOT super admin, assign user the selected schools id for school_id
                if (req.body.userLevel != "super admin"){
                    db.query(`INSERT INTO users (email, password, userLevel, school_id) VALUES('${req.body.email}', '${req.body.password}', '${req.body.userLevel}', (SELECT university_id from university where school_name = '${req.body.school_name}'))`,
                        (err, result) => {
                            if (err) {
                                return res.status(400).send({
                                    msg: err,
                                    line: 31,
                                    school: req.body.school_name
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
                // if userLevel is super admin, creating a user with the created schools id, also create user after with school_id.
                else {// first, create the university profile with error checking.
                    db.query(`INSERT INTO university (location, num_students, school_name) VALUES('${req.body.location}', '${req.body.num_students}', '${req.body.school_name}')`,
                        (err, result) => {
                            if (err) {
                                return res.status(400).send({
                                    msg: err,
                                    line: 49
                                });
                            }                            
                        }
                    )
                    // wait before executing next query.
                    wait(2000)
                    // if we make it past the above university profile creation, we can then create the user.
                    db.query(`INSERT INTO users (email, password, userLevel, school_id) VALUES('${req.body.email}', '${req.body.password}', '${req.body.userLevel}', (SELECT university_id from university where school_name = '${req.body.school_name}'))`,
                    (err, result) => {
                        if (err) {
                            return res.status(400).send({
                                msg: err,
                                line: 60
                            });
                        }
                        else{
                            return res.status(201).send({
                                msg: 'User registered.'
                            })
                        }                      
                    }
                )                                

                }
            }
        }
    )
})

router.post('/login', async (req, res, next) => {
    db.query(
        // checks is user email exists.
        `SELECT * FROM users WHERE LOWER(email) = LOWER(
            ${db.escape(req.body.email)})`,
        (err, result) => {
            // if email found, check password.
            if (result.length) {
                // if password matches, return a success response with the user info.
                if (result[0].password == req.body.password)
                {
                    return res.status(200).send({
                        msg: result
                    })
                }
                // info mismatch / user does not exist 
                else
                {
                    return res.status(403).send({
                        error: err
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
                    error: 'Incorrect information.'
                })
            }
        }
    )
})

// this grabs the school_name's from every university to display at the dropdown for registation.
router.post('/grabUnivNames', async (req, res, next) => {
    db.query(
        // first checks if the email already exists.
        `SELECT school_name FROM university`,
        (err, result) => {
            // if an error occurs.
            if (err) {
                return res.status(400).send({
                    error: err
                });
            } // if no error, return all of the school_names in the database
            else
            {
                return res.status(200).send({
                    msg: result
                });
            }
        }
    )
})

// creates an event given the:
// date, description, event_name, location, phone, rating, time, typeof_event, event_owner_id
router.post('/createEvent', async (req, res, next) => {
    db.query(
        // tries to insert and also grabs university id using event_owner_id
        `INSERT INTO event_list (date, description, event_name, location, phone, rating, time, typeof_event, event_owner_id, univ_id) 
            VALUES ('${req.body.date}', '${req.body.description}', '${req.body.event_name}', '${req.body.location}', 
                    '${req.body.phone}', '${req.body.rating}', '${req.body.time}', '${req.body.typeof_event}', '${req.body.event_owner_id}',
                        (SELECT school_id from users where user_id = '${req.body.event_owner_id}'))`,
        (err, result) => {
            // if an error occurs.
            if (err) {
                return res.status(400).send({
                    error: err
                });
            } // if no error, return result
            else
            {
                return res.status(200).send({
                    msg: result,
                    error: null
                });
            }
        }
    )
})

// needs comment, the_user, the_event_id, user_id
router.post('/addComment', async (req, res, next) => {
    db.query(
        `INSERT into comments (comment, the_user, comment_owner_id, the_event_id)
            VALUES ('${req.body.comment}', (SELECT email from users where user_id = '${req.body.user_id}'), 
                    '${req.body.user_id}', '${req.body.the_event_id}')`,
            (err, result) => {
                // if an error occurs.
                if (err) {
                    return res.status(400).send({
                        error: err
                    });
                } // if no error, return result
                else
                {
                    return res.status(200).send({
                        msg: result,
                        error: null
                    });
                }
            }
    )
})

module.exports = router;