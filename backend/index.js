const express = require('express')
require('express-async-errors')
const app = express()
require('dotenv').config()
const cors = require('cors')
app.use(cors())
const mongoose = require('mongoose')
const middleware = require('./utilities/middleware')
const carRouter = require('./controllers/car')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')


const MongoDB_URI = process.env.MongoDB_URI
const PORT = process.env.PORT
mongoose.connect(MongoDB_URI)
.then(() => {
    console.log('connected to MongoDB')
}).catch(error => {
    console.log('error connecting to database', error)
})
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/users', userRouter)
app.use('/api/cars', carRouter)
app.use('/api/login', loginRouter)
app.use('/api/images', express.static('images') )
app.use(middleware.errorHandler)
app.use(middleware.unknownEndPoint)
app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`)
})