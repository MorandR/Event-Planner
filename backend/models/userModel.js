const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true] // only value in array is true atm, but later could fill it with a string
    },                      // to show a message such as [true, 'Please add an email']
    username: {
        type: String,
        required: [true]
    },
    password: {
        type: String,
        required: [true]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)