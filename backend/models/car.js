const mongoose = require('mongoose')
const carSchema = new mongoose.Schema({
    brand:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    mileage:{
        type: String,
        required: true,
    },
    transmission:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    photo :{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

carSchema.set('toJSON',{
    transform:(document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports =mongoose.model('Car', carSchema)