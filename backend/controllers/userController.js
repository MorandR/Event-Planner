// mongoose with database means we get back a 'promise' from the database.
// using async with try/catch blocks is default, using express-async-handler
const asyncHandler = require('express-async-handler')

// model for user.
const User = require('../models/userModel')

// GET req. grabs user info and logs them in if correct info is given.
const loginUser = asyncHandler(async(req, res) => {
    // use await since this is an asynchronous event.
    const user = await User.find();

    var errMsg = ''

    // if username or password is not present.
    if (!req.body.username || !req.body.password)
    {
        res.status(400)
        errMsg = "'username' or 'password' field not found."
        throw new Error(errMsg)
    }
    res.status(200).json({message: "Login success."})
})

// POST req. to create a user. /api/createUser
const createUser = asyncHandler(async(req, res) => {

    // first check if the email is registered:
    User.findOne({email: req.body.email}).then((userFound) => {
        if (userFound)
        {
            return res.status(400).json({error: "Email already registered."})
        }
        else 
        {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            newUser.save()
            return res.status(200).json({message: newUser})
        }
    })
})

// PUT req. to update a user. /api/user/
const updateUser = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Update user ${req.params.id} success.`})
})

// DELETE req. to update a user. /api/user/
const deleteUser = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Delete user ${req.params.id} success.`})
})

module.exports = {
    loginUser,
    createUser,
    updateUser,
    deleteUser
}