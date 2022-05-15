const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const carRouter = require('./controllers/car')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const middleware = require('./utilities/middleware')

const app = express()
require('dotenv').config()
app.use(cors())
app.use(express.json())
const MongoDB_URI = process.env.MongoDB_URI
const PORT = process.env.PORT
mongoose.connect(MongoDB_URI)
.then(() => {
    console.log('connected to MongoDB')
}).catch(error => {
    console.log('error connecting to database', error)
})
app.use(middleware.tokenExtractor)
app.use('/api/cars', carRouter)
app.use('/api/users', userRouter)
app.use('api/login', loginRouter)
app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)
app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`)
})