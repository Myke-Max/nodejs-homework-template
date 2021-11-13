const { User } = require('../model/auth')
const jwt = require('jsonwebtoken')
const { Unauthorized, NotFound } = require('http-errors')
require('dotenv').config()
const { SECRET_KEY } = process.env
const authenticate = async (req, res, next) => {
  try {
    // Деструктуризация массива по пробелу
    const [bearer, token] = req.headers.authorization.split(' ')

    if (bearer !== 'Bearer') {
      throw new Unauthorized()
    }

    try {
      // valid token
      const { id } = jwt.verify(token, SECRET_KEY)
      // search the user if have ,if not,error
      const user = await User.findById(id) // second arg of method findById its a filter what i need to see in result
      if (!user) {
        throw new NotFound('User not found')
      }
      console.log(user)
      if (!user.token) {
        throw new Unauthorized('Please Authenticate ')
      }
      // save user to request.user(globally)
      req.user = user
      next()
    } catch (error) {
      throw new Unauthorized(error.message)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
