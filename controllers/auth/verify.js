const { User } = require('../../model/auth')
const { NotFound } = require('http-errors')

const verify = async (req, res) => {
  const { verificationToken } = req.params
  //   console.log(verificationToken)
  const user = await User.findOne({ verificationToken })
  console.log(user)
  if (!user) {
    throw new NotFound()
  }
  await User.findByIdAndUpdate(user._id, { verificationToken: null, verify: true })
  res.json({
    message: 'Verification successful',
  })
}
module.exports = verify
