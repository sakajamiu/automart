const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const body = request.body
  const saltRounds = 10

  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
      email: body.email,
      name: body.name,
      passwordHash: passwordHash
  })
  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = userRouter