const registrationValidationError = (res, error, status = 400) => {
  return res.status(status).json({
    // ContentType: application / json,
    ResponseBody: error.message,
  })
}
module.exports = registrationValidationError
