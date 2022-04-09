// mongoose with database means we get back a 'promise' from the database.
// using async with try/catch blocks is default, using express-async-handler
const asyncHandler = require('express-async-handler')

// model for user.
const User = require('../models/userModel')

// GET req. grabs user info if correct info is given. api/user
const loginUser = asyncHandler(async(req, res) => {
    // use await since this is an asynchronous event.
    // check if user exists then handle cases. assigning result to variable for easier parsing w/ mongoose.
    console.log("This is a get api")
    let thisUser = await User.findOne({username:req.body.username})

    if (thisUser)
    {   // can "login" since the user was found and password matches.
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

// POST req. to create a user. /api/user
const createUser = asyncHandler(async(req, res) => {


    console.log("we made it")
    // rudimentary missing info check.
    if (!req.body.username || !req.body.email || !req.body.password)
        return res.status(400).json({Error: 'Incorrect info'})

    // inefficient email or username taken check.
    await User.findOne({$or: [{email: req.body.email}, {username: req.body.username}]}).then((userFound) => 
    {
        // later, change this to detect if its the email or username already being used.
        if (userFound)
        {
            return res.status(400).json({error: "Email or username already registered."})
        }
        
        else 
        {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                userLevel: 'student'
            });
            
            newUser.save()
            return res.status(200).json({message: newUser})
            
        }
    })
})

// PUT req. to update a user. /api/user/:id
//use _id for route.
const updateUser = asyncHandler(async(req, res) => {
    // first, finding the user with the id.
    let user = await User.findById(req.params.id)

    // if user not found.
    if (!user)
    {
        res.status(400)
        throw new Error('User not found.')
    }

    // finds by parameter 'id', uses the body of the request, and if not found, creates a User.
    let updatedUser = await User.findByIdAndUpdate
    (req.params.id, req.body, {runValidators: true, returnOriginal: false, useFindAndModify: false})

    res.status(200).json(updatedUser)
})

// DELETE req. to update a user. /api/user/:id
const deleteUser = asyncHandler(async(req, res) => {
    let user = await User.findById(req.params.id)

    if (!user)
    {
        res.status(400)
        throw new Error('User not found.')
    }

    await User.deleteOne()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    loginUser,
    createUser,
    updateUser,
    deleteUser
}