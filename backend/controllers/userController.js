// GET req. grabs user info and logs them in if correct info is given. 
const loginUser = (req, res) => {
    res.status(200).json({message: "Login success."})
}

// POST req. to create a user. /api/user/:id
const createUser = (req, res) => {
    res.status(200).json({message: "Register success."})
}

// PUT req. to update a user. /api/user/
const updateUser = (req, res) => {
    res.status(200).json({message: `Update user ${req.params.id} success.`})
}

// DELETE req. to update a user. /api/user/
const deleteUser = (req, res) => {
    res.status(200).json({message: `Delete user ${req.params.id} success.`})
}

module.exports = {
    loginUser,
    createUser,
    updateUser,
    deleteUser
}