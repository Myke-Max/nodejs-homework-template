const nodeMailer = require('nodemailer')
require('dotenv').config()

const { G_MAIL_PASS } = process.env

const nodeMailerConfig = {
  host: 'smtp.gmail.com',
  port: '465',
  secure: true,
  auth: {
    user: 'mykola.kolesnyk.m@gmail.com',
    pass: G_MAIL_PASS,
  },
}

const transporter = nodeMailer.createTransport(nodeMailerConfig)

const sendEmail = async data => {
  const mail = { ...data, from: 'mykola.kolesnyk.m@gmail.com' }
  await transporter.sendMail(mail)
  return true
}

module.exports = sendEmail
