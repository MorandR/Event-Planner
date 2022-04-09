const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true] // only value in array is true atm, but later could fill it with a string
    },                      // to show a message such as [true, 'Please add an email']
    username: {
        type: String,
        required: [true],
        immutable: true
    },
    password: {
        type: String,
        required: [true]
    },
    userLevel:
    {
        type: String,
        enum: ['student', 'admin', 'super admin'],
        immutable: true
    }
}, {
    timestamps: true
})

// validator that we could use later on:
// password:{
//     type:String,
//     required:[true, "Password is a required field"],

// validate: {
//   validator: validator.isLength(value,{min:6,max:1000}),
//   message: "Length of the password should be between 6-1000"
// }

module.exports = mongoose.model('User', userSchema)