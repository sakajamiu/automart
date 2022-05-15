const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/,', async (req, res) =>{
  const body = req.body
  const saltRounds = 10

  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
      email: body.email,
      name: body.name,
      passwordHash: passwordHash
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

module.exports = userRouter