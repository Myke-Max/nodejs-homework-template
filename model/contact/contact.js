const { Schema, model } = require('mongoose')
const Joi = require('joi')
// const codeRegexp = /^[0-9]{10}$/
const contactsSchema = Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      required: true,
    },
    phone: {
      type: String,
      minLength: 2,
      maxLength: 30,
      required: true,
    },
    email: { type: String, minLength: 2, maxLength: 30, required: true },
    favorite: { type: Boolean },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    // code: {
    //   type: String,
    //   required: true,
    //   match: codeRegexp,
    // },
    //   status: {
    //     type: String,
    //     enum: ['stock', 'for order', 'discounts'],
    //     default: 'stock',
    //   },
  },
  { versionKey: false, timestamps: true },
)

const patterns = {
  phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
  name: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
}

const schemas = {
  name: Joi.string().pattern(new RegExp(patterns.name)),
  email: Joi.string().pattern(new RegExp(patterns.email)),
  phone: Joi.string().pattern(new RegExp(patterns.phone)),
  favorite: Joi.boolean(),
}

const joiSchema = Joi.object({
  name: schemas.name.required(),
  email: schemas.email.required(),
  phone: schemas.phone.required(),
  favorite: schemas.favorite,
})

const Contact = model('contacts', contactsSchema)

module.exports = { Contact, joiSchema }
