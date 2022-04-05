// mongoose with database means we get back a 'promise' from the database.
// using async with try/catch blocks is default, using express-async-handler
const asyncHandler = require('express-async-handler')

// model for user.
const User = require('../models/userModel')

// GET req. grabs user info and logs them in if correct info is given.
const loginUser = asyncHandler(async(req, res) => {
    // use await since this is an asynchronous event.
    // check if user exists then handle cases. assigning result to variable for easier parsing w/ mongoose.
    let thisUser = await User.findOne({username:req.body.username})

    if (thisUser)
    {   // can login since the user was found and password matches.
        if (thisUser.password === req.body.password)
            {
                return res.status(200).json({message: 'Login successful'})
            }
        else
        {
            return res.status(403).json({message: 'User not found or incorrect login credentials.'})
        }
    }
    // user was not found.
    else
    {
        return res.status(404).json({message: 'User not found or incorrect login credentials.'})
    }

})

// POST req. to create a user. /api/createUser
const createUser = asyncHandler(async(req, res) => {

    // first check if the email is registered:
    await User.findOne({email: req.body.email}).then((userFound) => 
    {
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