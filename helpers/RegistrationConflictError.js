const RegistrationConflictError = (res, error, status = 409) => {
  res.status(status).json({
    ResponseBody: {
      // Content-Type: application/json
      message: 'Email in use',
    },
  })
}

module.exports = RegistrationConflictError
