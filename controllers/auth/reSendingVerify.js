const { User } = require('../../model/auth')
const sendEmail = require('../../services/email/nodeMailer')
const reSendingVerify = async (req, res, next) => {
  const { email } = req.body

  if (!email) {
    return next(res.json({ message: 'missing required field email' }))
  }
  const user = await User.findOne({ email })
  const { verificationToken } = user
  if (user.verify) {
    return next(res.json({ message: 'Verification has already been passed' }))
  }
  const mail = {
    to: 'scart1992@mail.ru',
    subject: 'test nodeMailer',
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}">Нажмите для подтверждения email</a>`,
  }

  await User.findOneAndUpdate(user.email, { verificationToken })
  const send = await sendEmail(mail)
  console.log(send)
  return res.json({ message: 'Verification email sent' })
}
module.exports = reSendingVerify
