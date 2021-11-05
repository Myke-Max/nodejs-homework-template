const { Schema, model } = require('mongoose')
const codeRegexp = /^[0-9]{10}$/
const contactsSchema = Schema({
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
  code: {
    type: String,
    required: true,
    match: codeRegexp,
  },
  //   status: {
  //     type: String,
  //     enum: ['stock', 'for order', 'discounts'],
  //     default: 'stock',
  //   },
})

const contact = model('contacts', contactsSchema)

module.exports = contact
