const { Unauthorized } = require('http-errors')

const currentUser = (req, res) => {
  const { email, subscription } = req.user
  const [bearer, token] = req.headers.authorization.split(' ')
  console.log(bearer, token)
  if (!bearer && !token) {
    throw new Unauthorized('Please sign in')
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    result: {
      email,
      subscription,
    },
  })
}

module.exports = currentUser
