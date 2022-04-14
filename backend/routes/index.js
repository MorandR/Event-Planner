const express = require('express')
const router = express.Router()
const db = require('../config')
const bcrypt = require('bcrypt')

const saltRounds = 10

// wait function to prevent needed info from getting grabbed by next query before its ready
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

router.post('/register', async (req, res, next) => {

    const password = req.body.password

    bcrypt.hash(password, saltRounds, (err, hash) => {

        if (err) {
            console.log(err)
        }

        db.query(
            // first checks if the email already exists.
            `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(req.body.email)});`,
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
                        db.query(`INSERT INTO users (email, password, userLevel, school_id) VALUES(
                            '${req.body.email}', '${hash}', '${req.body.userLevel}', (
                                SELECT university_id from university where school_name = '${req.body.school_name}'));`,
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
                        db.query(`INSERT INTO users (email, password, userLevel, school_id) VALUES('${req.body.email}', '${hash}', '${req.body.userLevel}', (SELECT university_id from university where school_name = '${req.body.school_name}'))`,
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

    
})

router.post('/login', async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    db.query(
        // checks is user email exists.
        `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(email)});`,
        (err, result) => {

            // if email found, check password.
            if (result.length) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    
                    if (error)
                    {
                        return res.status(400).send({error: error})
                    }
                    else
                    {
                        return res.status(200).send({result: result[0]})
                    }
                    
                })
            }

            // incorrect info
            else {
                return res.send({message: "User doesn't exist"}) 
            }

                
        }
    )
})

// this grabs the school_name's from every university to display at the dropdown for registation.
router.get('/grabUnivNames', async (req, res, next) => {
    db.query(
        // selects all school names from university table.
        `SELECT school_name FROM university;`,
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
router.put('/createEvent', async (req, res, next) => {
    db.query(
        // tries to insert and also grabs university id using event_owner_id
        `INSERT INTO event_list (date, description, event_name, location, phone, rating, time, typeof_event, event_owner_id, univ_id) 
            VALUES ('${req.body.date}', '${req.body.description}', '${req.body.event_name}', '${req.body.location}', 
                    '${req.body.phone}', '${req.body.rating}', '${req.body.time}', '${req.body.typeof_event}', '${req.body.event_owner_id}',
                        (SELECT school_id from users where user_id = '${req.body.event_owner_id}'));`,
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
                    '${req.body.user_id}', '${req.body.the_event_id}');`,
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

router.get('/getEvents', async (req, res, next) => {
    db.query(
        `select * from event_list`,
        (err, result) => {
            if (err)
            {
                console.log(err)
                return res.status(400).send({
                    error: err
                })
            }
            else
            {
                res.status(200).send({
                    message: result
                })
            }
        }
    )
})

module.exports = router;