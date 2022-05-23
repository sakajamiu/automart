require('dotenv').config()

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
const tokenExtractor = (request, response, next) => {
    const getAuthorization = request.get('authorization')
    if(getAuthorization && getAuthorization.toLowerCase().startsWith('bearer ')){
        request.token = getAuthorization.substring(7)
    }else{
        request.token = null
    }
    next()
}

const userExtractor = async(request, response, next) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token|| !decodedToken){
        response.status(401).json({
            error: 'missing or invalid token'
        })
    }

    const user = await User.findById(decodedToken.id)
    request.user = user
    next()
}


const errorHandler = (error, request, response, next) => {
    if(error.name === 'CatError'){
        return response.status(400).json({ error: 'malformated ID'})
    }
    else if(error.name === 'ValidationError'){
        return response.status(400).json({ error: 'error.message'})

    }
    console.log(error.message)
    next(error)

}

const unknownEndPoint = (request,response) => {
    response.status(404).send({ error:'unknown Endpoint'})
}

module.exports = {
    requestLogger,
    tokenExtractor,
    userExtractor,
    unknownEndPoint,
    errorHandler,
}