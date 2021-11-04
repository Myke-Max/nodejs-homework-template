const Joi = require('joi')

const patterns = {
  phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
  name: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
}

const schemas = {
  name: Joi.string().pattern(new RegExp(patterns.name)),
  email: Joi.string().pattern(new RegExp(patterns.email)),
  phone: Joi.string().pattern(new RegExp(patterns.phone)),
}

module.exports = schemas
