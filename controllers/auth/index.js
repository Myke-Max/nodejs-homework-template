const registration = require('./registration')
const login = require('./login')
const logout = require('./logout')
const updateSubscription = require('../auth/updateSubscription')
const currentUser = require('./currentUser')
const updateImages = require('./updateImages')
const verify = require('./verify')
const reSendingVerify = require('./reSendingVerify')
module.exports = {
  registration,
  login,
  logout,
  updateSubscription,
  currentUser,
  updateImages,
  verify,
  reSendingVerify,
}
