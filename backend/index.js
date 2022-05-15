const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const carRouter = require('./controllers/car')

const app = express()
require('dotenv').config()
app.use(cors)
app.use(express.json())
const MongoDB_URI = process.env.MongoDB_URI
const PORT = process.env.PORT
mongoose.connect(MongoDB_URI)
.then(() => {
    console.log('connected to MongoDB')
}).catch(error => {
    console.log('error connecting to database', error)
})

app.use('/api/cars', carRouter)
app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`)
})