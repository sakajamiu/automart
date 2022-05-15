const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { use } = require('../controllers/car')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
    },
    name:{
        type: String,
        required: true
    },
    passwordHash:{
        type: String,
        required: true
    },
    cars: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Car',
        }
    ]

})

userSchema.set('toJSON',{
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
        delete returnedObject.passwordHash
    }
})
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)

