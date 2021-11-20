const { User } = require('../../model/auth')
const { NotFound, Unauthorized, BadRequest } = require('http-errors')
const { compareSync } = require('bcrypt')
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const tempPath = path.join(__dirname, '../../temp')
const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  // if (!user) {
  //   throw new NotFound(`user with ${email} not exist`)
  // }
  // const correctPassword = compareSync(password, user.password)

  // if (!correctPassword) {
  //   throw new Unauthorized('email or password are wrong')
  // }

  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('email or password are wrong')
  }
  const payload = { id: user._id }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
  await User.findByIdAndUpdate(user._id, { token })
  res.status(200).json({
    status: 'success',
    code: 200,
    result: {
      token,
    },
  })
}
module.exports = login
