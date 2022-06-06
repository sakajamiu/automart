require('dotenv').config()
const bcrypt = require('bcrypt')
const { request } = require('http')
const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async(req,res) =>{
    const body = req.body
    const user = await User.findOne({ email : body.email })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

        if(!(user && passwordCorrect)){
            return res.status(401).json({
                error: 'invalid username or password'
            })
        }

        const userForToken ={
            email: user.email,
            id: user._id
        }
        const token = jwt.sign(userForToken, process.env.SECRET)
        res.status(200).send({token, email: user.email, name: user.name, id: user._id, photo: user.photo})
})

module.exports = loginRouter