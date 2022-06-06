const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const  path = require('path')
const { response } = require('express')
const userExtractor = require('../utilities/middleware').userExtractor

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
userRouter.put('/', upload.single('photo'),userExtractor, async(req,res)  => {
  const photo = req.file.filename
  const userToUpdate = req.user
  const user ={
    photo: photo
  }
  const updatedUser = await User.findByIdAndUpdate(userToUpdate.id, user, {new: true})
  res.json(updatedUser)
})

module.exports = userRouter