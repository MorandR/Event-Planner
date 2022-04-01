// mongoose with database means we get back a 'promise' from the database.
// using async with try/catch blocks is default, using express-async-handler
const asyncHandler = require('express-async-handler')

// GET req. grabs user info and logs them in if correct info is given.
const loginUser = asyncHandler(async(req, res) => {

    var errMsg = ''

    // if username is not present.
    if (!req.body.username || !req.body.password)
    {
        res.status(400)
        errMsg = "'username' or 'password' field not found."
        throw new Error(errMsg)
    }
    res.status(200).json({message: "Login success."})
})

// POST req. to create a user. /api/user/:id
const createUser = asyncHandler(async(req, res) => {
    res.status(200).json({message: "Register success."})
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