const { User } = require('../../model/auth')
// const bcrypt = require('bcrypt')
const { Conflict } = require('http-errors')
const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid')
const sendEmail = require('../../sendGrid')
const tempPath = path.join(__dirname, '../temp')

const registration = async (req, res) => {
  const { email, password } = req.body
  const gravatar = require('gravatar')
  const avatarURL = gravatar.url(email)
  await fs.mkdir(tempPath)
  const findDublicateUser = await User.findOne({ email })
  if (findDublicateUser) {
    throw new Conflict(`user with ${email} already exist`)
  }
  const verificationToken = nanoid()
  const newUser = new User({ email, avatarURL, verificationToken })
  // newUser={email}
  newUser.setPassword(password)
  // function method inside the model setPassword
  // newUser = {email,password}
  await newUser.save()
  // after need save newUser

  // second method to do

  const mail = {
    to: 'scart1992@mail.ru',
    subject: 'test sendGrid',
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}">Нажмите для подтверждения email</a>`,
  }

  await sendEmail(mail)
  // const saltPassword = bcrypt.genSaltSync(10)
  // const hashPassword = bcrypt.hashSync(password, saltPassword)
  // const newUser = await User.create({ email, password: hashPassword })
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'registration successful',
  })
}
module.exports = registration
