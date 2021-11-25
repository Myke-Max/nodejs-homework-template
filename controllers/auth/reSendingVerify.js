const { User } = require('../../model/auth')
const sendEmail = require('../../sendGrid')
const reSendingVerify = async (req, res, next) => {
  const { email } = req.body

  if (!email) {
    return next(res.json({ message: 'missing required field email' }))
  }
  const user = await User.findOne({ email })
  const { verificationToken } = user
  if (user.verify) {
    return res.json({ message: 'Verification has already been passed' })
  }
  const mail = {
    to: 'scart1992@mail.ru',
    subject: 'test sendGrid',
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}">Нажмите для подтверждения email</a>`,
  }

  await User.findOneAndUpdate(user.email, { verificationToken })
  await sendEmail(mail)
  return res.json({ message: 'Verification email sent' })
}
module.exports = reSendingVerify
