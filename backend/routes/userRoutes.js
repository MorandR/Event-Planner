const express = require('express')
const router = express.Router()
const {loginUser, createUser, deleteUser, updateUser} = require('../controllers/userController')

// this just condenses the user routes below.
router.route('/').get(loginUser).post(createUser)
router.route('/:id').put(updateUser).delete(deleteUser)

//router.get('/', loginUser)
//router.post('/', createUser)
//router.put('/:id', updateUser)
//router.delete('/:id', deleteUser)

// this exports login, register, update user, delete user routes. CRUD operations.
module.exports = router