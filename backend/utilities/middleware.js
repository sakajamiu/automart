require('dotenv').config()

const jwt = require('jsonwebtoken')
const user = require('../models/user')
const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
    const getAuthorization = req.get('authorization')
    if(getAuthorization && getAuthorization.toLowerCase().startsWith('bearer ')){
        req.token = getAuthorization.substring(7)
    }else{
        req.token = null
    }
    next()
}

const userExtractor = async(req, res, next) => {
    const token = req.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token|| !decodedToken){
        res.status(401).json({
            error: 'missing or invalid token'
        })
    }

    const user = await User.findById(decodedToken.id)
    req.user = user
    next()
}


const errorHandler = (error, req, res, next) => {
    if(error.name === 'CatError'){
        return res.status(400).json({ error: 'malformated ID'})
    }
    else if(error.name === 'ValidationError'){
        return res.status(400).json({ error: 'error.message'})

    }
    console.log(error.message)
    next(error)

}

const unknownEndPoint = (req,res) => {
    res.status(404).send({ error:'unknown Endpoint'})
}

module.exports = {
    tokenExtractor,
    userExtractor,
    errorHandler,
    unknownEndPoint
}