const express = require('express')
const router = express.Router()
const db = require('../config')
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')

// wherever there is validateToken written into the parameters of a request, that means we use the middleware 
// to verify that its a valid token tored in the session storage before performing the action (valid logged in user)
const {validateToken} = require('../middleware/AuthMiddleware')


const saltRounds = 10

// wait function to prevent needed info from getting grabbed by next query before its ready
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

router.post('/register', async (req, res, next) => {

    const password = req.body.password

    bcrypt.hash(password, saltRounds).then((hash) => {

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
                        db.query(`INSERT INTO users (email, password, userLevel, school_id_user) VALUES(
                            '${req.body.email}', '${hash}', '${req.body.userLevel}', (
                                SELECT school_id from university where school_name = '${req.body.school_name}'));`,
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
                        db.query(`INSERT INTO users (email, password, userLevel, school_id_user) VALUES('${req.body.email}', '${hash}', '${req.body.userLevel}',
                                     (SELECT school_id from university where school_name = '${req.body.school_name}'))`,
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

    }).catch((err) => console.error(err))

    
})

router.post('/login', async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    console.log({email: email, password: password})
    db.query(
        // checks if user email exists.
        `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(email)});`,
        (err, result) => {
            
            // if email found, check password.
            if (result.length) {

                // getting user id if we get a result to later use in the token.
                const userId = result[0].user_id
                const schoolId = result[0].school_id_user

                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (err) return res.status(400).send({error: error})
                    if (!response) return res.status(400).send({error: 'Incorrect password.'})

                    // correct password given. accessToken signing with the userId, email. stored as user for identification.
                    const accessToken = sign({user_id: userId, email: email, school_id_user: schoolId}, process.env.SECRET)
                    
                    return res.status(200).send({token: accessToken})
                })
            }

            // incorrect info
            else {
                return res.status(403).send({error: "User doesn't exist"}) 
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
router.put('/createEvent', validateToken, async (req, res, next) => {

    // console.log(req.header);
    console.log(req.body);

    var locationAndTime = 0

    // checking location and time to see if an event already exists.
    db.query(`SELECT * from event_list where location = '${req.body.location}';`, (err, result) => {
        if (err){
            return res.status(400).send({
                error:err
            });
        }

        else if (result.length > 0){
            locationAndTime = locationAndTime + 1;
        }
    })

    db.query(`SELECT * from event_list where time = '${req.body.time}';`, (err, result) => {
        if (err){
            return res.status(400).send({
                error:err
            });
        }
        // if we find the same time, also check if location is the same also.
        else if (result.length > 0 && locationAndTime == 1){
            return res.status(400).send({
                message: "Can't create another event at same location and at the same time."
            });
        }
    })

    db.query(
        // tries to insert and also grabs university id using event_owner_id
        `INSERT INTO event_list (date, description, event_name, location, phone, rating, time, typeof_event, user_id_event, school_id_event) 
            VALUES ('${req.body.date}', '${req.body.description}', '${req.body.event_name}', '${req.body.location}', 
                    '${req.body.phone}', '${req.body.rating}', '${req.body.time}', '${req.body.typeof_event}', '${req.body.user_id}',
                        (SELECT school_id_user from users where user_id = '${req.body.user_id}'));`,
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
router.post('/addComment', validateToken, async (req, res, next) => {
    db.query(
        `INSERT into comments (comment, user_id_comment, event_id_comment)
            VALUES ('${req.body.comment}', '${req.body.user_id}', '${req.body.the_event_id}');`,
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

router.get('/getEvents', validateToken, async (req, res, next) => {

    db.query(
        `select * from event_list where school_id_event = '${req.body.school_id}'`,
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
                    msg: result
                })
            }
        }
    )
})

module.exports = router;