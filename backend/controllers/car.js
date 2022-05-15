const carRouter = require('express').Router()
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const  path = require('path')
const Car = require('../models/car')
const userExtractor = require('../utilities/middleware').userExtractor

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images')
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

let upload = multer({ storage, fileFilter })

carRouter.post('/', upload.single('photo'),userExtractor, async(req,res)  => {
    const body = req.body
    const photo = req.file.filename
    const user = req.user
    const car = new Car({
        brand: body.brand,
        name: body.name,
        mileage: body.mileage,
        transmission: body.transmission,
        location: body.location,
        photo: photo,
        description: body.description,
        price: body.price,
        user: user._id
    })
    const savedCar = await car.save()
    user.cars = user.cars.concat(savedCar._id)
    await user.save()
    res.json(savedCar)
})

carRouter.delete('/:id', userExtractor, async(req,res) => {
    const reqID = req.params.id
    const user = req.user
    const car = await Car.findById(reqID)
    if(car.user.toString() === user._id.toString()){
        await Car.findByIdAndRemove(reqID)
    }else{
        res.status(401).json({
            error: 'car can only be deleted by the user that post it'
        })
    }
}) 

carRouter.get('/', async(req,res) => {
    const cars = await Car.find({}).populate('user', {email: 1, name: 1})
    res.json(cars)
})

module.exports = carRouter