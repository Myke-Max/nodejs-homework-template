const sgEmail = require('@sendgrid/mail')
require('dotenv').config()
const { SG_API_KEY } = process.env

sgEmail.setApiKey(SG_API_KEY)

const sendEmail = async data => {
  const email = { ...data, from: 'scartman1992@gmail.com' }
  await sgEmail.send(email)
  return true
}
module.exports = sendEmail
